const mongoose = require("mongoose");
const validator = require("validator");

const Resident = require("../models/residentModel");
const User = require("../models/userModel");
const Auth = require("../models/authModel");
const Admin = require("../models/adminModel");
const Official = require("../models/officialModel");

// get all residents
const getResidents = async (req, res) => {
  try {
    const residents = await Resident.find({}).sort({ createdAt: -1 });

    res.status(200).json(residents);
  } catch (err) {
    res.status(404).json({ error: "Resident doesnt exist!" });
  }
};

// get single user
const getResidentById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid resident" });
  }

  try {
    const resident = await Resident.findById(id);
    res.status(200).json(resident);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create new user
const createResident = async (req, res) => {
  const {
    lastName,
    firstName,
    middleName,
    suffix,
    sex,
    emailAddress,
    contactNumber,
    birthDate,
    educationalAttainment,
    occupation,
    civilStatus,
    citizenship,
    category,
    houseNumber,
    streetAddress,
    purokNumber,
    profileNotes,
  } = req.body;

  // add doc to db
  try {
    const resident = await Resident.create({
      lastName,
      firstName,
      middleName,
      suffix,
      sex,
      emailAddress,
      contactNumber,
      birthDate,
      educationalAttainment,
      occupation,
      civilStatus,
      citizenship,
      category,
      houseNumber,
      streetAddress,
      purokNumber,
      profileNotes,
      profilePhoto: "",
    });

    // create user account for resident
    if (resident) {
      const generateTemporaryCredentials = () => {
        const characters =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
        let username = "";
        for (let i = 0; i < 10; i++) {
          let randomIndex = Math.floor(Math.random() * characters.length);
          username += characters[randomIndex];
        }
        return username;
      };

      let temporaryUsername;
      let temporaryPassword;

      while (true) {
        temporaryUsername = generateTemporaryCredentials();
        let exists = await Auth.findOne({ username: temporaryUsername });
        if (!exists?._id) {
          break;
        }
      }

      while (true) {
        temporaryPassword = generateTemporaryCredentials();
        if (validator.isStrongPassword(temporaryPassword)) {
          break;
        }
      }

      if (temporaryUsername && temporaryPassword) {
        await Auth.signup(resident?._id, temporaryUsername, temporaryPassword);
        await User.create({
          _id: resident?._id,
          residentName: `${resident?.lastName}, ${resident?.firstName} ${resident?.middleName} ${resident?.suffix}`,
          username: temporaryUsername,
        });

        res.status(200).json({
          resident: resident,
          message: "RESIDENT AND ACCOUNT CREATED SUCCESSFULLY!",
        });
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// delete user
const deleteResident = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid resident" });
  }

  try {
    await Resident.findOneAndDelete({ _id: id });
    await User.findOneAndDelete({ _id: id });
    await Auth.findOneAndDelete({ _id: id });
    await Admin.findOneAndDelete({ _id: id });
    await Official.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "resident deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such resident" });
  }
};

// update user
const updateResident = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid resident" });
  }

  try {
    await Resident.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json({ message: "user updated successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such user" });
  }
};

module.exports = {
  getResidents,
  getResidentById,
  createResident,
  deleteResident,
  updateResident,
};
