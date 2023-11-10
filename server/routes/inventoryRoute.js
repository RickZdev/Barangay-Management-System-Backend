const express = require("express");
const {
  getInventories,
  createInventory,
  deleteInventory,
  updateInventory,
} = require("../controllers/InventoryController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getInventories);

router.post("/", createInventory);

router.delete("/:id", deleteInventory);

router.patch("/:id", updateInventory);

module.exports = router;
