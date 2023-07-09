const mongoose = require("../database/mongo");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
  },
  { collection: "user" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
