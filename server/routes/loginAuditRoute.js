const express = require("express");
const {
  getLoginAudits,
  getLoginAuditById,
} = require("../controllers/loginAuditController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getLoginAudits);

router.get("/:id", getLoginAuditById);

module.exports = router;
