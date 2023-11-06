const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const residentStatusSchema = new Schema(
  {
    residentName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("ResidentStatus", residentStatusSchema);
