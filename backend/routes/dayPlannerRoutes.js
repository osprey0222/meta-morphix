const express = require("express");
const {
  getImportantNote,
  updateImportantNote,
  updateSides,
  updatePriorities,
} = require("../controllers/dayPlannerController");
const { authorized } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.get("/:dayPlanId/importantNote", getImportantNote);
router.patch("/:dayPlanId/importantNote", updateImportantNote);
router.patch("/:dayPlanId/sides", updateSides);
router.patch("/:dayPlanId/priorities", updatePriorities);

module.exports = router;
