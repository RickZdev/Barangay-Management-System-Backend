const express = require("express");
const {
  getIndigentBenefits,
  getIndigentBenefitById,
  createIndigentBenefit,
  updateIndigentBenefit,
} = require("../controllers/indigentBenefitController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getIndigentBenefits);

router.get("/:id", getIndigentBenefitById);

router.post("/", createIndigentBenefit);

router.patch("/:id", updateIndigentBenefit);

module.exports = router;
