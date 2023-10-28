const mongoose = require("mongoose");
const Auth = require("../models/authModel");
const Admin = require("../models/adminModel");
const LoginAuditModel = require("../models/loginAuditModel");

// json token
const jwt = require("jsonwebtoken");

// Token expires in 10 seconds
// decide if you refresh token or just session token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "365d" });
};

// login user
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

module.exports = {
  loginUser,
  signupUser,
  deleteUser,
};
