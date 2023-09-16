const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const residentSchema = new Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    suffix: {
      type: String,
      required: false,
    },
    sex: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: false,
      unique: true,
    },
    contactNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    educationalAttainment: {
      type: String,
      required: false,
    },
    occupation: {
      type: String,
      required: false,
    },
    civilStatus: {
      type: String,
      required: false,
    },
    citizenship: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    houseNumber: {
      type: Number,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    purokNumber: {
      type: Number,
      required: true,
    },
    profileNotes: {
      type: String,
      required: false,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Resident", residentSchema);
