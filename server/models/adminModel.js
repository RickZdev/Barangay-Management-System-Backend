const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    adminUsername: {
      type: String,
      required: true,
    },
    adminUser: {
      type: String,
      required: true,
    },
    adminRole: {
      type: String,
      required: true,
    },
    loggedIns: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Admin", adminSchema);
