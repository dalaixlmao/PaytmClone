const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../config");
const { User, Account } = require("../db");
const z = require("zod");
const { authMiddleware } = require("../middleware");

async function checkUserInDB(username) {
  const chk = await User.findOne({ username: username });
  if (chk) return chk;
  return false;
}

userRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const validSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    firstname: z.string(),
    lastname: z.string(),
  });
  const response = validSchema.safeParse(req.body);
  const chkUser = await checkUserInDB(username);
  if (chkUser || response.success == false)
    res.status(411).json({ message: "Email already taken / Incorrect inputs" });
  else {
    const user = await User.create({
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });

    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign(
      { userId: user._id},
      jwtPassword
    );
    res
      .status(200)
      .json({ message: "user created successfully", token: token });
  }
});

userRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const chk = await checkUserInDB(username);
  if (chk) {

    const token = jwt.sign(
      {
        userId:chk._id
      },
      jwtPassword
    );
    res.status(200).json({ token: token });
  } else {
    res.status(411).json({ message: "Error while logging in" });
  }
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  });
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const userId = req.userId;
  const chk = updateBody.safeParse(req.body);
  if (chk.success) {
    await User.findByIdAndUpdate(
      userId,
      { password: password, firstname: firstname, lastname: lastname }
    );
    res.status(200).json({ message: "Updated successfully" });
  } else
    res.status(411).json({
      message: "Error while updating information",
    });
});

userRouter.get("/bulk", async (req, res) => {
  const filterName = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filterName,
        },
      },
      {
        lastname: {
          $regex: filterName,
        },
      },
    ],
  });
  res.status(200).json(users);
});

module.exports = userRouter;
