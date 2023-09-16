const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    residentId: {
      type: String,
      required: true,
    },
    residentName: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    transactionDateAndTime: {
      type: String,
      required: true,
    },
    transactionReceiptNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    officialInCharge: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Transaction", transactionSchema);
