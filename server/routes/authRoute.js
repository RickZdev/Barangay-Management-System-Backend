const express = require("express");

const {
  loginUser,
  signupUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/authController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// delete user route
router.delete("/:id", deleteUser);

// forgot password route
router.post("/forgot-password", forgotPassword);

router.get("/reset-password/:id/:token", resetPassword);

router.patch("/change-password", changePassword);

module.exports = router;
