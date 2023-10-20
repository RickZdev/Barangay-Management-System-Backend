const mongoose = require("mongoose");
const validator = require("validator");
const helperFunction = require("../../helper/getFullName");
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
    _id,
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
    profilePhoto,
  } = req.body;

  // add doc to db
  try {
    const resident = await Resident.create({
      _id,
      fullName: helperFunction.getResidentFullName({
        lastName,
        firstName,
        middleName,
        suffix,
      }),
      lastName: helperFunction.getCapitalizeWords(lastName),
      firstName: helperFunction.getCapitalizeWords(firstName),
      middleName: helperFunction.getCapitalizeWords(middleName),
      suffix,
      sex,
      emailAddress,
      contactNumber: contactNumber.toString(),
      birthDate,
      educationalAttainment,
      occupation,
      civilStatus,
      citizenship,
      category,
      houseNumber,
      streetAddress: helperFunction.getCapitalizeWords(streetAddress),
      purokNumber,
      profileNotes,
      profilePhoto,
    });

    res.status(200).json({
      data: resident,
      message: "Resident Created Successfully.",
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.emailAddress
    ) {
      res.status(400).json({ error: "Email address already in use." });
    } else {
      res.status(404).json({ error: error.message });
    }
  }
};

// delete user
const deleteResident = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid resident" });
  }

  try {
    const residentToDelete = await Resident.findOne({ _id: id });

    await Resident.findOneAndDelete({ _id: id });
    await User.findOneAndDelete({ _id: id });
    await Auth.findOneAndDelete({ _id: id });
    await Admin.findOneAndDelete({ _id: id });
    await Official.findOneAndDelete({ _id: id });

    res.status(200).json({
      message: "resident deleted successfully!",
      data: residentToDelete,
    });
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
    const residentToUpdate = await Resident.findOne({ _id: id });

    if (residentToUpdate) {
      await Resident.findOneAndUpdate({ _id: id }, { ...req.body });

      if (residentToUpdate?.profilePhoto !== req.body.profilePhoto) {
        res.status(200).json({
          message: "Resident Updated Successfully.",
          data: residentToUpdate,
        });
      } else {
        res.status(200).json({
          message: "Resident Updated Successfully.",
        });
      }
    } else {
      return res.status(404).json({ error: "No such resident" });
    }
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.emailAddress
    ) {
      res.status(400).json({
        error: "Email address already in use.",
        message: error.message,
      });
    } else {
      res.status(404).json({ error: "No such user", message: error.message });
    }
  }
};

// search user
const searchResidents = async (req, res) => {
  const { value } = req.params;

  try {
    const residents = await Resident.find({
      $or: [{ fullName: { $regex: value, $options: "i" } }],
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(residents);
  } catch (err) {
    res.status(404).json({ error: "Resident doesnt exist!" });
  }
};

module.exports = {
  getResidents,
  getResidentById,
  createResident,
  deleteResident,
  updateResident,
  searchResidents,
};
