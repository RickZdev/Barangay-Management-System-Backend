const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const complaintsSchema = new Schema(
  {
    complainantsId: {
      type: String,
      required: true,
    },
    complainantsName: {
      type: String,
      required: false,
    },
    complainantsContactNumber: {
      type: Number,
      required: true,
    },
    complainantsAddress: {
      type: String,
      required: true,
    },
    complainantsStatement: {
      type: String,
      required: true,
    },
    respondentsId: {
      type: String,
      required: false,
    },
    respondentsName: {
      type: String,
      required: false,
    },
    incidentDateAndTime: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Complaints", complaintsSchema);
