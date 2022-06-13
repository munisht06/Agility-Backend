const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 255,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: 3,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 3,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
