const mongoose = require("mongoose");
const Blotter = require("../models/blotterModel");

const getBlotters = async (req, res) => {
  try {
    const blotters = await Blotter.find({}).sort({ createdAt: -1 });

    res.status(200).json(blotters);
  } catch (err) {
    res.status(404).json({ error: "Blotter doesnt exist!" });
  }
};

const getBlotterById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid blotter id" });
  }

  try {
    const blotter = await Blotter.findById(id);
    console.log(blotter);
    res.status(200).json(blotter);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createBlotter = async (req, res) => {
  const {
    complainantId,
    complainantName,
    incidentType,
    incidentLocation,
    respondentId,
    respondentName,
    incidentTimeAndDate,
    incidentReported,
    incidentRecorded,
    narrativeReport,
    status,
  } = req.body;

  // add doc to db
  try {
    const blotter = await Blotter.create({
      complainantId,
      complainantName,
      incidentType,
      incidentLocation,
      respondentId,
      respondentName,
      incidentTimeAndDate,
      incidentReported,
      incidentRecorded,
      narrativeReport,
      status,
    });
    res.status(200).json(blotter);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteBlotter = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid blotter id" });
  }

  try {
    await Blotter.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "blotter deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such blotter" });
  }
};

const updateBlotter = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid blotter id" });
  }

  try {
    await Blotter.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json({ message: "blotter updated successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such blotter" });
  }
};

module.exports = {
  getBlotters,
  getBlotterById,
  createBlotter,
  deleteBlotter,
  updateBlotter,
};
