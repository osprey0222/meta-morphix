const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../models/userModel");
const en = require("../utils/constants");
const { DayPlanner } = require("../models/dayPlannerModel");

//  /#/dateId/importantNote

// @GET
// Get Important note for the day
const getImportantNote = asyncHandler(async (req, res) => {
  const { dayPlanId } = req.params;
  const { importantNote } = await DayPlanner.findById(dayPlanId).select(
    "importantNote"
  );

  if (importantNote) {
    res.status(200).json({
      status: 200,
      data: importantNote,
      message: "Important Note fetched successfully.",
    });
  } else {
    res.status(400).json({ status: 400, message: "Somthing went wrong." });
  }
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

module.exports = {
  getImportantNote,
  updateImportantNote,
};
