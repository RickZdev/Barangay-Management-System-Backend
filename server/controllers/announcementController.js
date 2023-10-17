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
    const announcementToDelete = await Announcement.findOne({ _id: id });

    if (announcementToDelete) {
      await Announcement.findOneAndDelete({ _id: id });

      res.status(200).json({
        message: "Announcement deleted successfully!",
        data: announcementToDelete,
      });
    } else {
      return res.status(404).json({ error: "No such announcement" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid announcement id" });
  }

  try {
    const announcementToUpdate = await Announcement.findOne({ _id: id });

    if (announcementToUpdate) {
      await Announcement.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );

      if (
        announcementToUpdate?.announcementImage !== req.body.announcementImage
      ) {
        res.status(200).json({
          message: "announcement updated successfully!",
          data: announcementToUpdate,
        });
      } else {
        res.status(200).json({
          message: "announcement updated successfully!",
        });
      }
    } else {
      return res.status(404).json({ error: "No such announcement" });
    }
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
