const express = require("express");
const {
  getTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getTransactions);

router.get("/:id", getTransactionById);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

module.exports = router;
