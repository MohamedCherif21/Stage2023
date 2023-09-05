const express = require("express");

const User = require("../models/userModel");
const app = express.Router();
const multer = require("multer");
require("dotenv").config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const jwtSecret = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = jwtSecret;

function generateResetToken(email) {
  const payload = { email };
  const options = { expiresIn: "1h" }; // Le jeton expirera après 1 heure

  return jwt.sign(payload, JWT_SECRET, options);
}

const nodemailer = require("nodemailer");
const EMAIL_USER = emailUser;
const EMAIL_PASS = emailPass;

async function sendPasswordResetEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "cherif.mohamed@esprit.tn",
    to: email,
    subject: "Réinitialisation de mot de passe",
    text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetToken}`,
  };

  await transporter.sendMail(mailOptions);
}

app.use("/upload", express.static("upload"));

app.post("/login", async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email,
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

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post("/auth/google/callback", async (req, res) => {
  try {
    const googleUserData = req.body; // Les données reçues de Google
    // Vérifiez si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email: googleUserData.email });
    console.log(googleUserData);

    if (existingUser) {
      // Si l'utilisateur existe déjà, connectez-le ou faites d'autres actions nécessaires
      // Ensuite, renvoyez une réponse JSON appropriée
      return res.status(200).json({ message: "User already exists" });
    }
    console.log("Reached /auth/google/callback");
    console.log("Google User Data:", googleUserData);

    // Si l'utilisateur n'existe pas, créez un nouvel utilisateur avec les données Google
    const newUser = new User({
      email: googleUserData.email,
      password: googleUserData.exp,
      firsName: googleUserData.given_name,
      lastname: googleUserData.family_name,
      email: googleUserData.email,
      country: googleUserData.locale,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }

    // Générez un lien de réinitialisation de mot de passe sans utiliser de jeton
    const link = `http://localhost:3000/reset-password/${oldUser._id}`;
    
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: EMAIL_PASS,
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {
    // Gérer les erreurs
  }
});

app.post("/reset-password/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  console.log("ID:", id);
  console.log("New Password:", password);

  try {
    // Mise à jour du mot de passe sans le crypter
    await User.updateOne(
      {
        _id: id,
      },
      {
        password: password,
      }
    );
    console.log("Password updated successfully");
    res.status(200).json({ status: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ status: "An error occurred" });
  }
});


app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // 
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });  
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndRemove(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = app;
