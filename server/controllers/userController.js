const mongoose = require("mongoose");
const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { _id, username, residentName } = req.body;

  try {
    await User.create({
      _id,
      username,
      residentName,
    });

    res.status(200).json({
      data: { username: username, residentName: residentName },
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: "Users doesnt exist!" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid user" });
  }

  try {
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "Not a valid user" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid user" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json({ message: "user updated successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such user" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};
