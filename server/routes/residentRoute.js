const express = require("express");
const {
  getResidents,
  getResidentById,
  createResident,
  deleteResident,
  updateResident,
  searchResidents,
  getStatusResidents,
  deleteStatusResident,
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

router.get("/search/:value", searchResidents);

router.get("/status/resident", getStatusResidents);

router.delete("/status/resident/:id", deleteStatusResident);

module.exports = router;
