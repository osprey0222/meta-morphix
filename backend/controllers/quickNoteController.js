const asyncHandler = require("express-async-handler");
const { DayPlanner } = require("../models/dayPlannerModel");
const moment = require("moment");

// @UPDATE
// Update TT entry info
const getQuickNote = asyncHandler(async (req, res) => {
  const dayPlan = await DayPlanner.findById(dayPlanId);

  if (dayPlan) {
    const curr = dayPlan;

    dayPlan.timeTable[TT_index] = { ...curr, ...update };
    dayPlan.save();

    res.status(201).json({
      status: 201,
      data: dayPlan.timeTable,
      message: "TT Info Updated Successfully",
    });
  } else {
    res.status(400).json({ status: 400, message: "Invalid." });
    throw new Error("Invalid.");
  }
});

// @CREATE : Create new Timetable entry
// Create
const updateQuickNote = asyncHandler(async (req, res) => {
  const { dayPlanId } = req.params;
  const dayPlan = await DayPlanner.findById(dayPlanId);

  if (dayPlan) {
    const currTT = dayPlan.timeTable;

    let to;
    let from;

    if (currTT.length === 0) {
      to = moment(dayPlan.date + "08:00", "YYYY-MM-DDHH:mm").toISOString();
      from = moment(dayPlan.date + "09:00", "YYYY-MM-DDHH:mm").toISOString();
    } else {
      const { to: to_, from: from_ } = currTT[currTT.length - 1];
      to = moment(to_).add(1, "hour").toISOString();
      from = moment(from_).add(1, "hour").toISOString();
    }

    dayPlan.timeTable = [...currTT, { to, from }];
    dayPlan.save();
    res.status(200).json({
      status: 200,
      data: dayPlan.timeTable,
      message: "Posted new TT.",
    });
  } else {
    res.status(400).json({ status: 400, message: "Somthing went wrong." });
  }
});

module.exports = {
  getQuickNote,
  updateQuickNote,
};
