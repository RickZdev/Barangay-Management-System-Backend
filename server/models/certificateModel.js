const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const certificatesSchema = new Schema(
  {
    residentId: {
      type: String,
      required: true,
    },
    residentName: {
      type: String,
      required: false,
    },
    typeOfCertificate: {
      type: String,
      required: true,
    },
    dateRequested: {
      type: String,
      required: true,
    },
    dateOfReleased: {
      type: String,
      required: false,
    },
    certificateData: {
      type: Object,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

module.exports = mongoose.model("Certificates", certificatesSchema);
