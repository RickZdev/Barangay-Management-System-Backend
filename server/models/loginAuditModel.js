const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const loginAuditSchema = new Schema(
  {
    adminId: {
      type: String,
      required: true,
    },
    loggedIns: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("LoginAudit", loginAuditSchema);
