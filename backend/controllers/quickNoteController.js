const asyncHandler = require("express-async-handler");
const { DayPlanner } = require("../models/dayPlannerModel");
const moment = require("moment");
const { isDateValid } = require("../utils/utils");

// @UPDATE
// Update TT entry info
const getQuickNote = asyncHandler(async (req, res) => {
  const quickNotes = await DayPlanner.find({
    _id: { $in: Object.values(req.user.dayPlans) },
  }).select("date generalNote");

  const data = {};
  quickNotes.forEach(({ date, generalNote }) => {
    data[date] = generalNote;
  });

  res.status(200).json({
    status: 200,
    data,
    message: "Fetched Quick Notes.",
  });
});

// @UPDATE : Create new Timetable entry
// Update
const updateQuickNote = asyncHandler(async (req, res) => {
  const { dateISO } = req.params;

  if (!isDateValid(dateISO)) {
    res.status(400).json({ status: 400, message: "Invalid Date" });
  }

  const dayPlanId = req.user.dayPlans[dateISO];
  const dayPlan = await DayPlanner.findById(dayPlanId);
  const { quickNote } = req.body.data;

  if (dayPlan) {
    dayPlan.generalNote = quickNote;
    dayPlan.save();

    res.status(200).json({
      status: 200,
      data: quickNote,
      message: "Updated Quick Note.",
    });
  } else {
    res.status(400).json({ status: 400, message: "Somthing went wrong." });
  }
});

module.exports = {
  getQuickNote,
  updateQuickNote,
};
