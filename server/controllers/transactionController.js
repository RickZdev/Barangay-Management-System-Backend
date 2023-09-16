const mongoose = require("mongoose");
const Transaction = require("../models/transactionModel");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(404).json({ error: "Transactions doesnt exist!" });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid transaction id" });
  }

  try {
    const transaction = await Transaction.findById(id);
    console.log(transaction);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createTransaction = async (req, res) => {
  const {
    residentId,
    residentName,
    transactionType,
    transactionDateAndTime,
    transactionReceiptNumber,
    amount,
    officialInCharge,
  } = req.body;

  // add doc to db
  try {
    const transaction = await Transaction.create({
      residentId,
      residentName,
      transactionType,
      transactionDateAndTime,
      transactionReceiptNumber,
      amount,
      officialInCharge,
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid transaction id" });
  }

  try {
    await Transaction.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "transaction deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such transaction" });
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
};
