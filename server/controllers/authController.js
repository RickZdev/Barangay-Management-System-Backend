const Auth = require("../models/authModel");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const LoginAuditModel = require("../models/loginAuditModel");

// json token
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let userRole;
    const user = await Auth.login(username, password);
    const admin = await Admin.findOne({ _id: user._id });

    if (admin._id) {
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
    }

    // produce access token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { residentId, username, password } = req.body;

  try {
    const user = await Auth.signup(residentId, username, password);

    if (user) {
      await User.create({
        _id: residentId,
        username: username,
      });

      res.status(200).json({ username, message: "Register successfully!" });
    } else {
      res.status(400).json({ error: "Error creating an account!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
