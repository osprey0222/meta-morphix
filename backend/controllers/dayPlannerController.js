const asyncHandler = require("express-async-handler");
const { DayPlanner } = require("../models/dayPlannerModel");
const { isDateValid } = require("../utils/utils");
const moment = require("moment");

// @GET : Only For testing
// Get Important note for the day
const getImportantNote = asyncHandler(async (req, res) => {
  const { dayPlanId } = req.params;
  const { importantNote } = await DayPlanner.findById(dayPlanId).select(
    "importantNote"
  );

  if (importantNote === "" || importantNote) {
    res.status(200).json({
      status: 200,
      data: importantNote,
      message: "Important Note fetched successfully.",
    });
  } else {
    res.status(400).json({ status: 400, message: "Somthing went wrong." });
  }
});

// @GET
// Get Day Planner : everything!
// "create" if date not exists else "return data"
const getDayPlanner = asyncHandler(async (req, res) => {
  const { dateISO } = req.params;

  if (!isDateValid(dateISO)) {
    res.status(400).json({ status: 400, message: "Invalid Date" });
  }

  let dayPlan;
  const dayPlanId = req.user.dayPlans[dateISO];

  if (!dayPlanId) {
    // to date data found: create new
    // default: to: 08:00; from: 09:00
    dayPlan = await DayPlanner.create({
      date: dateISO,
      timeTable: [
        {
          to: moment(dateISO + "08:00", "YYYY-MM-DDHH:mm").toISOString(),
          from: moment(dateISO + "09:00", "YYYY-MM-DDHH:mm").toISOString(),
        },
        {
          to: moment(dateISO + "09:00", "YYYY-MM-DDHH:mm").toISOString(),
          from: moment(dateISO + "10:00", "YYYY-MM-DDHH:mm").toISOString(),
        },
        {
          to: moment(dateISO + "10:00", "YYYY-MM-DDHH:mm").toISOString(),
          from: moment(dateISO + "11:00", "YYYY-MM-DDHH:mm").toISOString(),
        },
      ],
    });
    // Adding to current user
    req.user.dayPlans.push({ [dateISO]: dayPlan.id });
    req.user.save();
  } else {
    dayPlan = await DayPlanner.findById({ _id: dayPlanId });
  }
  res.status(200).json({ status: 200, data: dayPlan, message: "Fetched " });
});

// @UPDATE
// Update Important note for the day
const updateImportantNote = asyncHandler(async (req, res) => {
  const { dayPlanId } = req.params;
  const { importantNote } = req.body.data;

  const dayPlan = await DayPlanner.findByIdAndUpdate(
    dayPlanId,
    { importantNote },
    { new: true }
  );

  if (dayPlan) {
    res.status(201).json({
      status: 201,
      message: "Important Note Updated Successfully",
    });
  } else {
    res.status(400).json({ status: 400, message: "Invalid Client." });
    throw new Error("Invalid Client.");
  }
});

// @UPDATE
// Update Important note for the day
const updateSides = asyncHandler(async (req, res) => {
  const { dayPlanId } = req.params;
  const { sides } = req.body.data;

  const dayPlan = await DayPlanner.findByIdAndUpdate(
    dayPlanId,
    { sides },
    { new: true }
  );

  if (dayPlan) {
    res.status(201).json({
      status: 201,
      message: "Side Updated Successfully",
    });
  } else {
    res.status(400).json({ status: 400, message: "Invalid." });
    throw new Error("Invalid.");
  }
});

// @UPDATE
// Update Important note for the day
const updatePriorities = asyncHandler(async (req, res) => {
  const { dayPlanId } = req.params;
  const { priorities } = req.body.data;

  const dayPlan = await DayPlanner.findByIdAndUpdate(
    dayPlanId,
    { priorities },
    { new: true }
  );

  if (dayPlan) {
    res.status(201).json({
      status: 201,
      message: "Priorities Updated Successfully",
    });
  } else {
    res.status(400).json({ status: 400, message: "Invalid." });
    throw new Error("Invalid.");
  }
});

module.exports = {
  getDayPlanner,
  getImportantNote,
  updateImportantNote,
  updateSides,
  updatePriorities,
};
