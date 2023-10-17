const express = require("express");

const {
  loginUser,
  signupUser,
  deleteUser,
} = require("../controllers/authController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// delete user route
router.delete("/:id", deleteUser);

module.exports = router;
