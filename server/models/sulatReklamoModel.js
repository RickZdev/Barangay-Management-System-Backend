const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const sulatReklamoSchema = new Schema(
  {
    residentId: {
      type: String,
      required: true,
    },
    residentName: {
      type: String,
      required: false,
    },
    dateAndTimeRecorded: {
      type: String,
      required: true,
    },
    narrativeReport: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("SulatReklamo", sulatReklamoSchema);
