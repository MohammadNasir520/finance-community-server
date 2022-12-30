const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        // student post 

        app.post('/students', async (req, res) => {
            const students = req.body;
            console.log(students)
            const result = await studentsCollection.insertOne(students)
            res.send(result)

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