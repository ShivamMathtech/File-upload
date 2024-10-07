const express = require("express");
const app = express();
// multer helping the handling the files for the users
const multer = require("multer");
// const upload = multer({ dest: "upload/" });
const mongoose = require("mongoose");
require("dotenv").config();
// usnig the app.use(express.json()); for getting the value of the body
app.use(express.json());
// define the promise function for the connetion
connectdb()
  .then((d) => {
    console.log("connected");

    app.post("/api/files", (req, res) => {
      res.status(200).json({
        msg: "Data sent successfully",
      });
    });
  })
  .catch((err) => {
    console.log("error: ", err);
    res.status(500).json({
      msg: "Error",
    });
  })
  .finally();
async function connectdb() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log("Connected");
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("myfile"), (req, res) => {
  console.log(req.file.originalname);
  res.status(200).json({
    msg: "Data sent successfully",
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server in running on ${port}`);
});
