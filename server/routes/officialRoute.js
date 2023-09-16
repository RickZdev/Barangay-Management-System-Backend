const express = require("express");
const {
  getOfficials,
  getOfficialByPosition,
  createOfficial,
  deleteOfficial,
  updateOfficial,
} = require("../controllers/officialController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getOfficials);

router.get("/:position", getOfficialByPosition);

router.post("/", createOfficial);

router.delete("/:id", deleteOfficial);

router.patch("/:position", updateOfficial);

module.exports = router;
