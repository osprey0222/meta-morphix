const express = require("express");
const {
  getImportantNote,
  updateImportantNote,
} = require("../controllers/dayPlannerController");
const { authorized } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.get("/:dayPlanId/importantNote", getImportantNote);
router.patch("/:dayPlanId/importantNote", updateImportantNote);

module.exports = router;
