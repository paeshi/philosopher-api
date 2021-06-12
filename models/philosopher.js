const mongoose = require("mongoose");

const philosopherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    years: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    philosophy: {
      type: String,
    },
    teaching: {
      type: String,
    },
    quotes: {
      type: [String],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Philosopher", philosopherSchema);
