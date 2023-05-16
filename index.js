const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");

// json web token

app.use(express.json());
app.use(cors());
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}... ...`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

const verifyJWT = (req, res, next) => {
  const tokenString = req.headers.token;
  const reqEmail = tokenString.split(" ")[1];
  const token = tokenString.split(" ")[2];
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      err = {
        name: "NotBeforeError",
        message: "jwt not active",
      };
      const data = err;
      res.status(401).send({ data });
    } else {
      const email = decoded.email;
      req.decodedEmail = email;
      req.reqEmail = reqEmail;
      next();
    }
  });
};

async function run() {
  try {
    // home
    app.get("/", (req, res) => {
      res.send({ message: "Server is running" });
    });

    // Create a access token
    app.post("/jwt", (req, res) => {
      const email = req.body.email;
      console.log(email, " => Line No: 31");
      const data = { email };
      const token = jwt.sign(data, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // check token
    app.get("/verify", verifyJWT, (req, res) => {
      if (req.reqEmail === req.decodedEmail) {
        res.send({
          message: "Token is valid",
          reqEmail: req.reqEmail,
          decodedEmail: req.decodedEmail,
        });
      } else {
        res.send({
          message: "Email is not valid",
          reqEmail: req.reqEmail,
          decodedEmail: req.decodedEmail,
        });
      }
    });

    // // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // // create a database
    // const usersCollection = client.db("usersCollection").collection("users");

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
    //   // Ensures that the client will close when you finish/error
    //   // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
