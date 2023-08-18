const express = require("express");

const User = require("../models/userModel");
const app = express.Router();
const multer = require("multer");

app.use("/upload", express.static("upload"));


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
    const userId = req.body._id; // Assurez-vous que vous avez l'ID de l'utilisateur connecté

    // Mettez à jour l'URL de l'image pour l'utilisateur spécifique en utilisant son ID
    await User.updateOne({ _id: userId }, { image: imageUrl });

    console.log(imageUrl);
    res.json({ imageUrl }); // Renvoie l'URL de l'image dans la réponse JSON
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});


app.get("/upload/:filename", async (req, res) => {
  try {
    const user = await User.findById(req.query.userId);
    if (user && user.data.image === req.params.filename) {
      const imagePath = path.join(__dirname, "../upload", req.params.filename);
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ error: "Image retrieval failed" });
  }
});



module.exports = app;
