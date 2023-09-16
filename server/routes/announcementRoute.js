const express = require("express");
const {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} = require("../controllers/announcementController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all users request routes
// router.use(requireAuth);

router.get("/", getAnnouncements);

router.get("/:id", getAnnouncementById);

router.post("/", createAnnouncement);

router.delete("/:id", deleteAnnouncement);

router.patch("/:id", updateAnnouncement);

module.exports = router;
