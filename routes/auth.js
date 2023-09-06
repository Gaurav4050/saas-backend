const express = require("express");
const {
  loginController,
  registerController,
  getItemController,
  createitemController,
} = require("../controllers/registerController");

const route = express.Router();

// Signup
route.post("/register", registerController);
route.post("/login", loginController);
route.get("/items", getItemController);
route.post("/additem", createitemController);

module.exports = route;
