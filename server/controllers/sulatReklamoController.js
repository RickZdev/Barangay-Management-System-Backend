const mongoose = require("mongoose");
const SulatReklamo = require("../models/sulatReklamoModel");

const getSulatReklamo = async (req, res) => {
  try {
    const sulatReklamo = await SulatReklamo.find({}).sort({ createdAt: -1 });

    res.status(200).json(sulatReklamo);
  } catch (err) {
    res.status(404).json({ error: "SulatReklamo doesnt exist!" });
  }
};

const getSulatReklamoById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid sulat reklamo id" });
  }

  try {
    const sulatReklamo = await SulatReklamo.findById(id);
    console.log(sulatReklamo);
    res.status(200).json(sulatReklamo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createSulatReklamo = async (req, res) => {
  const {
    residentId,
    residentName,
    dateAndTimeRecorded,
    narrativeReport,
    status,
  } = req.body;

  try {
    const sulatReklamo = await SulatReklamo.create({
      residentId,
      residentName,
      dateAndTimeRecorded,
      narrativeReport,
      status,
    });
    res.status(200).json(sulatReklamo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteSulatReklamo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid sulat reklamo id" });
  }

  try {
    await SulatReklamo.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "sulat reklamo deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such sulat reklamo" });
  }
};

const updateSulatReklamo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid sulat reklamo id" });
  }

  try {
    await SulatReklamo.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json({ message: "sulat reklamo updated successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such sulat reklamo" });
  }
};

module.exports = {
  getSulatReklamo,
  getSulatReklamoById,
  createSulatReklamo,
  deleteSulatReklamo,
  updateSulatReklamo,
};
