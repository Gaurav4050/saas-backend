const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const UserAuth = require("./routes/auth");
//configure env
dotenv.config();

// Middleware for JSON request bodies
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://booking:booking@cluster0.s0xost2.mongodb.net/saas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(`error ${error}`);
  });

app.use("/auth", UserAuth);

app.listen(5000, () => {
  console.log("server us runnning on prot 5000");
});
