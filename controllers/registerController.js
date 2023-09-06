const UserModel = require("../models/userModel");
const Items = require("../models/Items");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// to register a controller
exports.registerController = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const name = await UserModel.findOne({ username });

    if (name) {
      res.status(400).json({
        message: "User Already Exist",
      });
      return;
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username,
      password: hashpassword,
    });

    await user.save();

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while register the student",
      Error: error,
    });
  }
};

// for sign in

exports.loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check whether user exist or not

    const user = await UserModel.findOne({ username });

    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({
        message: "Password does not match",
      });
    }

    // let's generate JWT token

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(Error);

    res.status(400).json({
      message: "error while login",
    });
  }
};

// get all items from databse

exports.getItemController = async (req, res) => {
  // get all data from controller

  try {
    const data = await Items.find({});

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "Error while fetching the data",
      Error: error,
    });
  }
};

// post request for items or save items

exports.createitemController = async (req, res) => {
  try {
    const { itemname, price, discountprice, image } = req.body;

    const item = new Items({
      itemname,
      price,
      discountprice,
      image,
    });

    await item.save();

    res.status(200).json({
      item,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "Error while creating the item",
      Error: error,
    });
  }
};
