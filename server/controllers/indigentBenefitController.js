const mongoose = require("mongoose");
const IndigentBenefit = require("../models/indigentBenefitModel");

const getIndigentBenefits = async (req, res) => {
  try {
    const indigentBenefits = await IndigentBenefit.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(indigentBenefits);
  } catch (err) {
    res.status(404).json({ error: "Indigent Benefit doesnt exist!" });
  }
};

const getIndigentBenefitById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid indigent benefit id" });
  }

  try {
    const indigentBenefit = await IndigentBenefit.findById(id);
    console.log(indigentBenefit);
    res.status(200).json(indigentBenefit);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createIndigentBenefit = async (req, res) => {
  const {
    residentId,
    residentName,
    pension,
    category,
    purok,
    status,
    receiver,
    relation,
    birthDate,
    monthAndYear,
  } = req.body;

  try {
    const indigentBenefit = await IndigentBenefit.create({
      residentId,
      residentName,
      pension,
      category,
      purok,
      status,
      receiver,
      relation,
      birthDate,
      monthAndYear,
    });

    res.status(200).json(indigentBenefit);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateIndigentBenefit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid indigent benefit id" });
  }

  try {
    await IndigentBenefit.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json({ message: "indigent benefit updated successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such indigent benefit" });
  }
};

module.exports = {
  getIndigentBenefits,
  getIndigentBenefitById,
  createIndigentBenefit,
  updateIndigentBenefit,
};
