const express = require("express");
const {
  getImportantNote,
  updateImportantNote,
  updateSides,
  updatePriorities,
  getDayPlanner,
} = require("../controllers/dayPlannerController");
const { authorized } = require("../middlewares/authorizationMiddleware");
const {
  postTT,
  deleteTT,
  updateTT,
} = require("../controllers/timeTableController");

const router = express.Router();

router.get("/:dateISO", authorized, getDayPlanner);
router.get("/:dateISO/importantNote", authorized, getImportantNote);
router.patch("/:dateISO/importantNote", authorized, updateImportantNote);
router.patch("/:dateISO/sides", authorized, updateSides);
router.patch("/:dateISO/priorities", authorized, updatePriorities);

// TT
router.post("/:dateISO/TT", authorized, postTT);
router.patch("/:dateISO/TT/:TT_index", authorized, updateTT);
router.delete("/:dateISO/TT/:TT_index", authorized, deleteTT);

module.exports = router;
