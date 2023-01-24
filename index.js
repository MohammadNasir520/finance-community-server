const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()

// middle ware
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c5dej4c.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const studentsCollection = client.db('financeCommunity').collection('students')


        // ------------------------------students--------------------------------
        // student post 
        app.post('/students', async (req, res) => {
            const students = req.body;
            console.log(students)
            const result = await studentsCollection.insertOne(students)
            res.send(result)

        })

        // get  students by batch 
        app.get('/students', async (req, res) => {
            // let query = {};
            const batch = req.query.batch;
            console.log(batch);
            if (batch) {
                query = {
                    batch: batch
                }
            }
            const result = await studentsCollection.find(query).toArray()
            res.send(result);
        })


        // get a single student by id
        app.get('/studentProfile/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const query = {
                _id: ObjectId(id)
            }
            const result = await studentsCollection.findOne(query)
            res.send(result)
        })

        // get student by email
        app.get('/student/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = {
                email: email
            }
            const result = await studentsCollection.findOne(query)
            res.send(result)
        })

        // registration request and update a student Information
        app.put('/student/:email', async (req, res) => {
            const student = req.body
            const email = req.params.email;
            console.log(student, email);
            const query = {

                email: email
            }
            const options = { upsert: true }
            const updateDoc = {
                $set: student
            }
            const result = await studentsCollection.updateOne(query, updateDoc, options)
            res.send(result);

        })

    }
    finally {

    }


}
run().catch(error => { console.log(error) })






app.get('/', (req, res) => {
    res.send('Finance community server running')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})