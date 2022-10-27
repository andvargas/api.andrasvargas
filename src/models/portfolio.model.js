const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: { type: String, required: true },
    image: { type: Buffer },
    link: { type: String },
    status: { type: String },
    buttonLeft: { type: String },
    buttonRight: { type: String },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", portfolioSchema);

module.exports = Project;
