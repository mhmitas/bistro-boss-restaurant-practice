const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Wellcome to Bistro Boss Restaurant')
})

// middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jt5df8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// `````````Mongodb`````````
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const database = client.db('bistroDB_practice')
const menuColl = database.collection('menu')
const cartColl = database.collection('carts')
const reviewColl = database.collection('review')
const userColl = database.collection('users')

async function run() {
    try {
        // user related APIs
        app.get('/users', async (req, res) => {
            const result = await userColl.find().toArray()
            res.send(result)
        })

        app.post('/users', async (req, res) => {
            // sobsomoy uid khate na;
            const user = req.body;
            const query = { email: user?.email }
            const isExist = await userColl.findOne(query)
            console.log(isExist)
            if (isExist) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userColl.insertOne(user);
            res.send(result)
        })

        app.patch('/users/admin/:id', async (req, res) => {
            const id = req.params.id;
            const doc = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = { $set: doc };
            const result = await userColl.updateOne(filter, updateDoc, options)
            console.log(result)
            res.send(result)
        })

        app.delete('/users/delete/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await userColl.deleteOne(query)
            res.send(result)
        })

        //  menu and cart related APIs
        app.get('/menu', async (req, res) => {
            // console.log(req.query)
            let query = {}
            let limit = 0
            if (req.query.category) {
                query = { category: req.query.category }
            }
            if (req.query.limit) {
                limit = parseInt(req.query.limit)
            }
            const result = await menuColl.find(query).limit(limit).toArray()
            res.send(result)
        })

        app.get('/carts/:uid', async (req, res) => {
            const uid = req.params.uid;
            const query = { userId: uid }
            const result = await cartColl.find(query).toArray()
            res.send(result)
        })

        app.get('/menu/carts/:uid', async (req, res) => {
            const uid = req.params.uid;
            const query = { userId: uid }
            const items = await cartColl.find(query).toArray()
            const itemIds = items.map(item => ObjectId.createFromHexString(item.itemId))
            const filter = { _id: { $in: itemIds } }
            const result = await menuColl.find(filter).toArray()
            res.send(result)
        })

        app.post('/carts', async (req, res) => {
            const item = req.body;
            const result = await cartColl.insertOne(item)
            res.send(result)
        })

        // remove items from cart
        app.delete('/carts/delete/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)
            const query = { itemId: id }
            const result = await cartColl.deleteOne(query)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Bistro Boss server is listening on port ${port}`)
})