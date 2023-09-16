const express = require("express");
const {
  getBorrowedInventory,
  getBorrowedInventoryById,
  createBorrowedInventory,
  deleteBorrowedInventory,
} = require("../controllers/borrowedInventoryController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getBorrowedInventory);

router.get("/:id", getBorrowedInventoryById);

router.post("/", createBorrowedInventory);

router.delete("/:id", deleteBorrowedInventory);

module.exports = router;
