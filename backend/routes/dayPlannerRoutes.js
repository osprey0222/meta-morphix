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
router.get("/:dayPlanId/importantNote", authorized, getImportantNote);
router.patch("/:dayPlanId/importantNote", authorized, updateImportantNote);
router.patch("/:dayPlanId/sides", authorized, updateSides);
router.patch("/:dayPlanId/priorities", authorized, updatePriorities);

// TT
router.post("/:dayPlanId/TT", authorized, postTT);
router.patch("/:dayPlanId/TT/:TT_index", authorized, updateTT);
router.delete("/:dayPlanId/TT/:TT_index", authorized, deleteTT);

module.exports = router;
