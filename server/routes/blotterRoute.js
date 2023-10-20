const express = require("express");
const {
  getBlotters,
  getBlotterById,
  createBlotter,
  deleteBlotter,
  updateBlotter,
} = require("../controllers/blotterController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getBlotters);

router.get("/:id", getBlotterById);

router.post("/", createBlotter);

router.delete("/:id", deleteBlotter);

router.patch("/:id", updateBlotter);

module.exports = router;
