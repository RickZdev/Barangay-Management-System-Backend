const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const officialSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
    },
    residentId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Official", officialSchema);
