const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true, // It should be "required" not "require"
  },
});

module.exports = mongoose.model("UserModel", UserSchema);
