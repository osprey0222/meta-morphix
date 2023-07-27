const asyncHandler = require("express-async-handler");
const { DayPlanner } = require("../models/dayPlannerModel");
const { isDateValid } = require("../utils/utils");
const moment = require("moment");

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

// @CREATE : Create new Timetable entry
// Create
const postTT = asyncHandler(async (req, res) => {
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
    // res.status(400).json({ status: 400, message: "Somthing went wrong." });
  }
});

// @DELETE
// Delete Timetable
const deleteTimeTable = asyncHandler(async (req, res) => {
  const { dateISO } = req.params;

  if (!isDateValid(dateISO)) {
    res.status(400).json({ status: 400, message: "Invalid Date" });
  }

  let dayPlan = await DayPlanner.findOne({ date: dateISO });

  if (!dayPlan) {
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
  }

  res.status(200).json({ status: 200, data: dayPlan, message: "Fetched " });
});

module.exports = {
  postTT,
};
