const express = require('express');
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware

app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fbwplfx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect()
        const projectCollection = client.db("protfolio").collection("project");
        // Get all Protfolio
        app.get('/protfolio', async (req, res)=>{
            const result = await projectCollection.find().toArray()
            res.send(result)
        })

        // find single protfolio using id
        app.get('/protfolio/:id', async(req, res)=>{
            const id = req.params.id;
            const quote = {_id: ObjectId(id)}
            const result = await projectCollection.findOne(quote);
            res.send(result)
        })

    }
    finally{
        // console log finnaly
    }

}


run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Protfolio is connected')
})
app.listen(port, () => {
    console.log('protfolio run with', port)
})