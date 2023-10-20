const mongoose = require("mongoose");
const BorrowedInventory = require("../models/borrowedInventoryModel");

const getBorrowedInventory = async (req, res) => {
  try {
    const borrowedInventory = await BorrowedInventory.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(borrowedInventory);
  } catch (err) {
    res.status(404).json({ error: "borrowedInventory doesnt exist!" });
  }
};

const getBorrowedInventoryById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid borrowedInventory id" });
  }

  try {
    const borrowedInventory = await BorrowedInventory.findById(id);
    res.status(200).json(borrowedInventory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createBorrowedInventory = async (req, res) => {
  const {
    borroweeId,
    borroweeName,
    borroweeContactNumber,
    borrowedItems,
    borrowedDateAndTime,
    purposeOfBorrowing,
    eventLocation,
    officialInCharge,
  } = req.body;
  try {
    const borrowedInventory = await BorrowedInventory.create({
      borroweeId,
      borroweeName,
      borroweeContactNumber,
      borrowedItems,
      borrowedDateAndTime,
      purposeOfBorrowing,
      eventLocation,
      officialInCharge,
    });
    res.status(200).json(borrowedInventory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteBorrowedInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid borrowedInventory id" });
  }

  try {
    await BorrowedInventory.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "borrowedInventory deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such borrowedInventory" });
  }
};

module.exports = {
  getBorrowedInventory,
  getBorrowedInventoryById,
  createBorrowedInventory,
  deleteBorrowedInventory,
};
