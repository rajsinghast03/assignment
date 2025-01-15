const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
