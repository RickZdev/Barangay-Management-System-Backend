const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const indigentBenefitSchema = new Schema(
  {
    residentId: {
      type: String,
      required: true,
    },
    residentName: {
      type: String,
      required: true,
    },
    pension: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    purok: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    receiver: {
      type: String,
      required: false,
    },
    relation: {
      type: String,
      required: false,
    },
    monthAndYear: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("IndigentBenefit", indigentBenefitSchema);
