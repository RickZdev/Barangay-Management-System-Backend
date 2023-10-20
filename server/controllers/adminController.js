const mongoose = require("mongoose");
const Admin = require("../models/adminModel");
const Resident = require("../models/residentModel");
const User = require("../models/userModel");

const getAdmins = async (req, res) => {
  try {
    const admin = await Admin.find({}).sort({ createdAt: -1 });
    res.status(200).json(admin);
  } catch (err) {
    res.status(404).json({ error: "admin doesnt exist!" });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid admin id" });
  }

  try {
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createAdmin = async (req, res) => {
  const { adminId, adminRole } = req.body;

  try {
    const residentDetails = await Resident.findById({ _id: adminId });
    const userDetails = await User.findById({ _id: adminId });
    const exists = await Admin.findById({ _id: adminId });

    if (!exists) {
      const admin = await Admin.create({
        _id: adminId,
        adminUsername: userDetails.username,
        adminUser: `${residentDetails.lastName}, ${residentDetails.firstName} ${residentDetails.middleName} ${residentDetails.suffix}`,
        adminRole: adminRole,
        loggedIns: "",
      });

      res.status(200).json(admin);
    } else {
      const admin = await Admin.findOneAndUpdate(
        { _id: adminId },
        {
          adminRole: adminRole,
        }
      );
      res.status(200).json({ message: "admin updated successfully!" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid admin id" });
  }

  try {
    await Admin.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "admin deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such admin" });
  }
};

module.exports = {
  getAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
};
