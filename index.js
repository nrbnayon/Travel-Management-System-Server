const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db("euroTravel");

    const webuser = database.collection("users");

    const spot = database.collection("spots");

    app.get("/users", async (req, res) => {
      try {
        const user = await webuser.find().toArray();
        res.send(user);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    app.get("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await webuser.findOne(query);
        res.send(user);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log(newUser);
      try {
        const result = await webuser.insertOne(newUser);
        console.log(`New User with the id: ${result.insertedId}`);
        res.json(result);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error" });
      }
    });
    app.get("/", (req, res) => {
      res.send("Euro Travel Server is running");
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    app.listen(port, () => {
      console.log(`Server is running on Port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.error);
