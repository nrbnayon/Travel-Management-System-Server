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
    // await client.connect();
    const database = client.db("euroTravel");

    const webuser = database.collection("users");

    const spot = database.collection("spots");

    const ourCountries = database.collection("countries");

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

    app.get("/spots", async (req, res) => {
      try {
        const user = await spot.find().toArray();
        res.send(user);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Spot Post

    app.post("/spots", async (req, res) => {
      const newUser = req.body;
      try {
        const result = await spot.insertOne(newUser);
        res.json(result);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error" });
      }
    });
    //Spot Update
    app.put("/spots/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedSpot = req.body;
        const updated = {
          $set: {
            image: updatedSpot.image,
            tourists_spot_name: updatedSpot.tourists_spot_name,
            country_Name: updatedSpot.country_Name,
            location: updatedSpot.location,
            short_description: updatedSpot.short_description,
            average_cost: updatedSpot.average_cost,
            seasonality: updatedSpot.seasonality,
            travel_time: updatedSpot.travel_time,
            totalVisitorsPerYear: updatedSpot.totalVisitorsPerYear,
          },
        };
        const result = await spot.updateOne(filter, updated, options);

        res.send(result);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Spot Get
    app.get("/spots/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await spot.findOne(query);
        res.send(user);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Spot Delete

    app.delete("/spots/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await spot.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.error("Error deleting spot:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // all country data get
    app.get("/countries", async (req, res) => {
      try {
        const countries = await ourCountries.find().toArray();
        res.json(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    // post all countries
    app.post("/countries", async (req, res) => {
      const countriesData = req.body;
      try {
        const result = await ourCountries.insertMany(countriesData);
        console.log(
          `${result.insertedCount} documents inserted into countries collection`
        );
        res.json(result);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error" });
      }
    });
    app.get("/", (req, res) => {
      res.send("Euro Travel Server is running");
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log("Successfully connected to MongoDB!");

    app.listen(port, () => {
      console.log(`Server is running on Port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.error);
