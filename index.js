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
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
