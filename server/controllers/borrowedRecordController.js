const mongoose = require("mongoose");
const BorrowedRecord = require("../models/borrowedRecordModel");

const getBorrowedRecords = async (req, res) => {
  try {
    const borrowedRecords = await BorrowedRecord.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(borrowedRecords);
  } catch (err) {
    res.status(404).json({ error: "borrowedRecords doesnt exist!" });
  }
};

const createBorrowedRecord = async (req, res) => {
  const {
    borroweeId,
    borroweeName,
    borroweeContactNumber,
    borrowedItems,
    borrowedDateAndTime,
    returnedDateAndTime,
    purposeOfBorrowing,
    eventLocation,
    officialInCharge,
  } = req.body;
  try {
    const borrowedRecord = await BorrowedRecord.create({
      borroweeId,
      borroweeName,
      borroweeContactNumber,
      borrowedItems,
      borrowedDateAndTime,
      returnedDateAndTime,
      purposeOfBorrowing,
      eventLocation,
      officialInCharge,
    });
    res.status(200).json(borrowedRecord);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteBorrowedRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid borrowedRecord id" });
  }
  try {
    await BorrowedRecord.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "borrowedRecord deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such borrowedRecord" });
  }
};

module.exports = {
  getBorrowedRecords,
  createBorrowedRecord,
  deleteBorrowedRecord,
};
