const express = require("express");
const {
  getSulatReklamo,
  getSulatReklamoById,
  createSulatReklamo,
  deleteSulatReklamo,
  updateSulatReklamo,
} = require("../controllers/sulatReklamoController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getSulatReklamo);

router.get("/:id", getSulatReklamoById);

router.post("/", createSulatReklamo);

router.delete("/:id", deleteSulatReklamo);

router.patch("/:id", updateSulatReklamo);

module.exports = router;
