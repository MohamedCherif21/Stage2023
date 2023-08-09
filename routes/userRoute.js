const express = require("express");

const User = require("../models/userModel");
const app = express.Router();
const path = require("path");
const multer = require("multer");
app.use(express.static("upload"));

app.post("/login", async (req, res) => {
  try {
    const result = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (result) {
      res.send(result);
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();

    res.send("registration  successfull");
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body._id }, req.body);
    const user = await User.findOne({ _id: req.body._id });
    res.send(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//const express = require("express");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path;
    await User.updateOne({profileImage:imageUrl})
    console.log(imageUrl)
    res.json({ imageUrl }); // Renvoie l'URL de l'image dans la réponse JSON
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});

app.get("/imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "upload", imageName);

  res.sendFile(imagePath);
});





module.exports = app;
