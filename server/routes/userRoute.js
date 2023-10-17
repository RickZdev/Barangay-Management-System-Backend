const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

module.exports = router;
