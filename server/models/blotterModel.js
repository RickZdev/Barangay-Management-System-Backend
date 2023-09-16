const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blotterSchema = new Schema(
  {
    complainantId: {
      type: String,
      required: true,
    },
    complainantName: {
      type: String,
      required: false,
    },
    incidentType: {
      type: String,
      required: true,
    },
    incidentLocation: {
      type: String,
      required: true,
    },
    respondentId: {
      type: String,
      required: true,
    },
    respondentName: {
      type: String,
      required: false,
    },
    incidentTimeAndDate: {
      type: String,
      required: false,
    },
    incidentReported: {
      type: String,
      required: false,
    },
    incidentRecorded: {
      type: String,
      required: false,
    },
    narrativeReport: {
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

module.exports = mongoose.model("Blotter", blotterSchema);
