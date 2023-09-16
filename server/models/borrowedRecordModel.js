const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const borrowedRecordSchema = new Schema(
  {
    borroweeId: {
      type: String,
      required: true,
    },
    borroweeName: {
      type: String,
      required: true,
    },
    borroweeContactNumber: {
      type: Number,
      required: true,
    },
    borrowedDateAndTime: {
      type: String,
      required: true,
    },
    returnedDateAndTime: {
      type: String,
      required: true,
    },
    borrowedItems: {
      type: Array,
      required: true,
    },
    purposeOfBorrowing: {
      type: String,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    officialInCharge: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("BorrowedRecord", borrowedRecordSchema);
