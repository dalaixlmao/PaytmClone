const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:Anubhav15@cluster0.9pxbci7.mongodb.net/paytm-app"
);

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    maxLength: 30,
    minLength: 3,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 60,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 60,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const account = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: { type: Number, required: true },
});

const User = mongoose.model("User", user);
const Account = mongoose.model("Account", account);

module.exports = {
  User,
  Account,
};
