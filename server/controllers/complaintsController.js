const mongoose = require("mongoose");
const Complaints = require("../models/complaintsModel");

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaints.find({}).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (err) {
    res.status(404).json({ error: "Complaint doesnt exist!" });
  }
};

const getComplaintsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid complaint id" });
  }

  try {
    const complaint = await Complaints.findById(id);
    console.log(complaint);
    res.status(200).json(complaint);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createComplaint = async (req, res) => {
  const {
    complainantsId,
    complainantsName,
    complainantsContactNumber,
    complainantsAddress,
    complainantsStatement,
    respondentsId,
    respondentsName,
    complaintType,
    incidentDateAndTime,
    status,
  } = req.body;

  // add doc to db
  try {
    const complaint = await Complaints.create({
      complainantsId,
      complainantsName,
      complainantsContactNumber,
      complainantsAddress,
      complainantsStatement,
      respondentsId,
      respondentsName,
      complaintType,
      incidentDateAndTime,
      status,
    });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid complaint id" });
  }

  try {
    await Complaints.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "complaint deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such complaint" });
  }
};

const updateComplaint = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid complaint id" });
  }

  try {
    await Complaints.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json({ message: "complaint updated successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such complaint" });
  }
};

module.exports = {
  getComplaints,
  getComplaintsById,
  createComplaint,
  deleteComplaint,
  updateComplaint,
};
