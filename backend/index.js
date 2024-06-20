const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { User } = require("./db");
const router = require("./routes/index");
const app = express();
const PORT = 3000;
app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
