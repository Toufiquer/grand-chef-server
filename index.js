const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

async function run() {
  try {
    // home
    app.get("/", (req, res) => {
      res.send({ message: "Server is running" });
    });

    // get a  user
    app.get("/user/:userId", async (req, res) => {
      // const { userId } = req.params;
      // const query = { _id: new ObjectId(userId) };
      // const options = {};
      // const result = await usersCollection.findOne(query, options);
      // res.send(result);
    });

    // add user
    app.post("/user", async (req, res) => {
      // const user = req.body;
      // const result = await usersCollection.insertOne(user);
      // res.send(result);
    });

    // update a user
    app.put("/user/:userId", async (req, res) => {
      // const { userId } = req.params;
      // const user = req.body;
      // // create a filter for a movie to update
      // const filter = { _id: new ObjectId(userId) };
      // // this option instructs the method to create a document if no documents match the filter
      // const options = { upsert: true };
      // // create a document that sets the plot of the movie
      // const updateDoc = {
      //   $set: {
      //     ...user,
      //   },
      // };
      // const result = await usersCollection.updateOne(
      //   filter,
      //   updateDoc,
      //   options
      // );
      // res.send(result);
    });

    // Delete a user
    app.delete("/user/:userId", async (req, res) => {
      // const { userId } = req.params;
      // const filter = { _id: new ObjectId(userId) };
      // const result = await usersCollection.deleteOne(filter);
      // res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
