const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discountprice: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
