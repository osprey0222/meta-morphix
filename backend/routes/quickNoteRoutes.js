const express = require("express");
const { authorized } = require("../middlewares/authorizationMiddleware");
const {
  getQuickNote,
  updateQuickNote,
} = require("../controllers/quickNoteController");

const router = express.Router(); // Quick Notes
router.get("/", authorized, getQuickNote);
router.patch("/:dateISO", authorized, updateQuickNote);

module.exports = router;
