const express = require("express");
const {
  getBorrowedRecords,
  createBorrowedRecord,
  deleteBorrowedRecord,
} = require("../controllers/borrowedRecordController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getBorrowedRecords);

router.post("/", createBorrowedRecord);

router.delete("/:id", deleteBorrowedRecord);

module.exports = router;
