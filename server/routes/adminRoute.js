const express = require("express");
const {
  getAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getAdmins);

router.get("/:id", getAdminById);

router.post("/", createAdmin);

router.delete("/:id", deleteAdmin);

module.exports = router;
