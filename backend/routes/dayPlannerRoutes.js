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

router.get("/:dateISO", getDayPlanner);
router.get("/:dayPlanId/importantNote", getImportantNote);
router.patch("/:dayPlanId/importantNote", updateImportantNote);
router.patch("/:dayPlanId/sides", updateSides);
router.patch("/:dayPlanId/priorities", updatePriorities);

// TT
router.post("/:dayPlanId/TT", postTT);
router.patch("/:dayPlanId/TT/:TT_index", updateTT);
router.delete("/:dayPlanId/TT/:TT_index", deleteTT);

module.exports = router;
