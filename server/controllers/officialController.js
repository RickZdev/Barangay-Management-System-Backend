const mongoose = require("mongoose");
const Official = require("../models/officialModel");

const getOfficials = async (req, res) => {
  try {
    const officials = await Official.find({}).sort({ createdAt: -1 });
    res.status(200).json(officials);
  } catch (err) {
    res.status(404).json({ error: "Officials doesnt exist!" });
  }
};

const getOfficialByPosition = async (req, res) => {
  const { position } = req.params;

  try {
    const official = await Official.findOne({ position: position });
    res.status(200).json(official);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createOfficial = async (req, res) => {
  const { position, residentId } = req.body;

  try {
    const official = await Official.create({
      position,
      residentId,
    });
    res.status(200).json(official);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteOfficial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid official id" });
  }

  try {
    await Official.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "official deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such official" });
  }
};

const updateOfficial = async (req, res) => {
  const { position } = req.params;

  try {
    const officialToUpdate = await Official.findOne({
      residentId: req.body.residentId,
    });

    if (!officialToUpdate?.residentId) {
      await Official.findOneAndUpdate(
        { position: position },
        {
          ...req.body,
        }
      );

      res.status(200).json({ message: "official updated successfully!" });
    } else {
      res.status(404).json({ message: "Official already assigned!" });
    }
  } catch (error) {
    res.status(404).json({ error: "No such official" });
  }
};

const searchOfficials = async (req, res) => {
  const { value } = req.params;

  try {
    const officials = await Official.find({
      $or: [
        { firstName: { $regex: value, $options: "i" } },
        { middleName: { $regex: value, $options: "i" } },
        { lastName: { $regex: value, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(officials);
  } catch (err) {
    res.status(404).json({ error: "Official doesnt exist!" });
  }
};

module.exports = {
  getOfficials,
  getOfficialByPosition,
  createOfficial,
  deleteOfficial,
  updateOfficial,
  searchOfficials,
};
