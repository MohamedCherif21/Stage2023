const express = require("express");
const app = express();
const dbConnect = require("./dbConnect");
const cors = require("cors"); // Importez le module CORS
const path = require("path");

app.use(cors());

app.use(express.json());
const port = process.env.PORT || 5000;
const userRoute = require("./routes/userRoute");

app.use("/api/user/", userRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client/build/index.html"))
  );
}
app.get("/", (req, res) => res.send("hello world"));
app.listen(port, () => console.log("Exemple app listening on port", { port }));
