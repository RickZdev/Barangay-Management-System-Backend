const express = require("express");
const {
  getCertificates,
  createCertificate,
  deleteCertificate,
  updateCertificate,
} = require("../controllers/certificateController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getCertificates);

router.post("/", createCertificate);

router.delete("/:id", deleteCertificate);

router.patch("/:id", updateCertificate);

module.exports = router;
