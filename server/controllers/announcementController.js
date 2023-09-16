const mongoose = require("mongoose");
const Announcement = require("../models/announcementModel");

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({}).sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(404).json({ error: "Announcements doesnt exist!" });
  }
};

const getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid announcement id" });
  }

  try {
    const announcement = await Announcement.findById(id);
    console.log(announcement);
    res.status(200).json(announcement);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createAnnouncement = async (req, res) => {
  const {
    announcementTitle,
    announcementMessage,
    announcementImage,
    datePosted,
    announcedBy,
  } = req.body;

  // add doc to db
  try {
    const announcement = await Announcement.create({
      announcementTitle,
      announcementMessage,
      announcementImage,
      datePosted,
      announcedBy,
    });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid announcement id" });
  }

  try {
    await Announcement.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "announcement deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such announcement" });
  }
};

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid announcement id" });
  }

  try {
    await Announcement.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json({ message: "announcement updated successfully!" });
  } catch (error) {
    res.status(404).json({ error: "No such announcement" });
  }
};

module.exports = {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
};
