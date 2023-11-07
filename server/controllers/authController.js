const mongoose = require("mongoose");
const Auth = require("../models/authModel");
const Admin = require("../models/adminModel");
const LoginAuditModel = require("../models/loginAuditModel");
const Resident = require("../models/residentModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

// json token
const jwt = require("jsonwebtoken");

// nodemailer
const mail = require("../../helper/nodeMailerService");

// Token expires in 10 seconds
// decide if you refresh token or just session token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "365d" });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let userRole;
    const user = await Auth.login(username, password);
    const admin = await Admin.findOne({ _id: user._id });

    if (admin) {
      const timeAndDate =
        new Date().toLocaleDateString() +
        " - " +
        new Date().toLocaleTimeString();
      admin.loggedIns.push(timeAndDate);
      await admin.save(); // save the updated admin object

      await LoginAuditModel.create({
        adminId: admin?._id,
        loggedIns: timeAndDate,
      });

      userRole = admin?.adminRole;

      const token = createToken(user?._id);

      res
        .status(200)
        .json({ _id: user._id, username, token, userRole: userRole });
    } else {
      userRole = "Resident";

      const token = createToken(user?._id);

      res
        .status(200)
        .json({ _id: user._id, username, token, userRole: userRole });
    }

    // produce access token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const auth = await Auth.signup(username, password);

    if (auth) {
      const user = await Auth.create({
        username: username,
        password: auth?.password,
      });

      res.status(200).json({
        data: { _id: user?._id, username: username },
        message: "Register successfully!",
      });
    } else {
      res.status(400).json({ error: "Error creating an account!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid user id" });
  }

  try {
    await Auth.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "user deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such user" });
  }
};

const forgotPassword = async (req, res) => {
  const { emailAddress } = req.body;

  try {
    const user = await Resident.findOne({ emailAddress });

    if (!mongoose.Types.ObjectId.isValid(user?._id)) {
      return res.status(404).json({ error: "Not a valid user id" });
    }

    const auth = await Auth.findById(user?._id);
    if (!auth) {
      res.status(404).json({ error: "No such user" });
    }

    const secret = process.env.JWT_SECRET + auth?.password;
    const token = jwt.sign(
      { emailAddress: emailAddress, id: auth?._id },
      secret,
      { expiresIn: "1m" }
    );

    const forgotPasswordLink = `${process.env.CLIENT_PRODUCTION_ROUTE}/portal/reset-password?id=${auth?._id}&token=${token}`;

    // mail the link to email address
    mail.changePasswordMailer(emailAddress, user?.fullName, forgotPasswordLink);

    res.status(200).json({
      message: "Reset password link sent to email address successfully",
    });
  } catch (error) {
    res.status(404).json({ error: "No such user" });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid user id" });
  }

  try {
    const auth = await Auth.findById(id);

    if (!auth) {
      res.status(404).json({ error: "No such user" });
    }

    const secret = process.env.JWT_SECRET + auth?.password;
    const verifyToken = jwt.verify(token, secret);

    if (verifyToken) {
      res.status(200).json({ message: verifyToken });
    } else {
      res.status(404).json({ error: "Not a valid token" });
    }
  } catch (error) {
    res.status(404).json({ error: "Token Expired" });
  }
};

const changePassword = async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid user id" });
  }

  if (!validator.isStrongPassword(newPassword)) {
    return res.status(404).json({ error: "Password is not strong enough!" });
  }

  try {
    const auth = await Auth.findById(id);

    if (currentPassword) {
      const match = await bcrypt.compare(currentPassword, auth.password);

      if (!match) {
        throw Error("Incorrect Password");
      }
    }

    if (!auth) {
      res.status(404).json({ error: "No such user" });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    await Auth.updateOne(
      { _id: id },
      {
        $set: { password: encryptedPassword },
      }
    );

    res.status(200).json({
      message: "Changed Password Successfully",
    });
  } catch (error) {
    res.status(404).json({ error: "Incorrect Password" });
  }
};
module.exports = {
  loginUser,
  signupUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  changePassword,
};
