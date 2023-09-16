const express = require("express");
const {
  getComplaints,
  getComplaintsById,
  createComplaint,
  deleteComplaint,
  updateComplaint,
} = require("../controllers/complaintsController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getComplaints);

router.get("/:id", getComplaintsById);

router.post("/", createComplaint);

router.delete("/:id", deleteComplaint);

router.patch("/:id", updateComplaint);

module.exports = router;
