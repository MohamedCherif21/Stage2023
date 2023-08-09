const mongoose = require("mongoose");

const dbName = "mycv";
const URL = `mongodb+srv://cherifmohamed:Rktkn003@cluster0.1un2yow.mongodb.net/${dbName}`;

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connecté avec succès à la base de données.");
});

connection.on("error", (error) => {
  console.log("Erreur de connexion à la base de données:", error);
});
