const express = require("express");
const {
  getResidents,
  getResidentById,
  createResident,
  deleteResident,
  updateResident,
} = require("../controllers/residentController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getResidents);

router.get("/:id", getResidentById);

router.post("/", createResident);

router.delete("/:id", deleteResident);

router.patch("/:id", updateResident);

module.exports = router;
