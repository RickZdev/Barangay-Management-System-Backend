const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    announcementTitle: {
      type: String,
      required: true,
    },
    announcementMessage: {
      type: String,
      required: true,
    },
    announcementImage: {
      type: String,
      required: false,
    },
    datePosted: {
      type: String,
      required: true,
    },
    announcedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Announcement", announcementSchema);
