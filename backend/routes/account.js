const { Router } = require("express");
const { Account, User } = require("../db");
const accountRouter = Router();
const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../config");
const mongoose = require("mongoose");
const {authMiddleware} = require("../middleware");

accountRouter.get("/balance",authMiddleware, async (req, res) => {
  console.log(req);
  const id = req.userId;
  const account = await Account.findOne({
    userId: id,
  });
  res.status(200).json({ balance: account.balance });
  
});


accountRouter.post("/transfer",authMiddleware, async (req, res) => {
  console.log("body", req.body);
  console.log("header", req.headers);
  const session = await mongoose.startSession();
  session.startTransaction();
  const to = req.body.to;
  const amount = req.body.amount;
  const senderId = req.userId;
  const senderAccount = await Account.findOne({ userId: senderId }).session(session);
  const reciever = await User.findById(to).session(session);
  if (!reciever) {
    await session.abortTransaction();
    res.status(400).json({ message: "Invalid account" });
  }
  if (senderAccount.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({ message: "Insufficient balance" });
  }
  await Account.updateOne(
    { userId: senderId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  session.commitTransaction();

  res.status(200).json({ message: "Transaction successful" });
});

module.exports = accountRouter;
