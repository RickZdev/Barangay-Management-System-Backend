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

module.exports = {
  getBorrowedRecords,
  createBorrowedRecord,
};
