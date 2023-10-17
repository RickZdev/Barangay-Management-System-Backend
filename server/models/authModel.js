const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

authSchema.statics.login = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("User doesn't exist!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password!");
  }

  return user;
};

// static sign up method
authSchema.statics.signup = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const isUserExists = await this.findOne({ username });

  if (isUserExists) {
    throw Error("Username already in use!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = {
    username: username,
    // password: password,
    password: hash,
  };

  return user;
};

module.exports = mongoose.model("Auth", authSchema);
