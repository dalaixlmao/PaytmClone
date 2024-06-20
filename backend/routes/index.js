const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const { jwtPassword } = require("../config");
const accountRouter = require("./account");

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
