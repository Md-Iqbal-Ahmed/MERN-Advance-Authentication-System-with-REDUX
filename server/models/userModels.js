const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      requied: [true, "Please enter email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      requied: [true, "Please enter password"],
    },
    role: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dduf88shi/image/upload/v1615304007/Avatar/avatar_xkkten.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
