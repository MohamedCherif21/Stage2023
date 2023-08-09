const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firsName: { type: String, default: "" },
    lastname: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    country: { type: String, default: "" },
    ProfessionalSummary:{type: String ,default:""},
    city: { type: String, default: "" },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    employment: { type: Array, default: [] },
    Project: { type: Array, default: [] },
    profileImage: { type: String, default: "" }, // Store the image URL here
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
