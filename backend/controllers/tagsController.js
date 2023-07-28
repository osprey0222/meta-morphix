const asyncHandler = require("express-async-handler");
const { DayPlanner } = require("../models/dayPlannerModel");
const { isDateValid } = require("../utils/utils");
const moment = require("moment");
const { Tags } = require("../models/tagsModel");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

// @GET : Get All Tags
// Get
const getTags = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 200,
    data: req.user,
    message: "Fetched.",
  });
});

// @CREATE : Create new Tag
// Create
const postTag = asyncHandler(async (req, res) => {
  const { label, color } = req.body.data;

  if (req.user.tags.length < 10) {
    const index = req.user.tags.findIndex((p) => p.label === label);
    if (index !== -1) {
      res.status(400).json({ status: 400, message: "Tag Already Exists" });
      return;
    }

    req.user.tags.push({ label, color });
    req.user.save();

    res.status(200).json({
      status: 200,
      data: req.user.tags,
      message: "Posted new Tag.",
    });
  } else {
    res.status(400).json({ status: 400, message: "Too many tags." });
  }
});

// @DELETE
// Delete Tag
const deleteTag = asyncHandler(async (req, res) => {
  const { label } = req.body.data;

  const tags = req.user.tags;
  const index = req.user.tags.findIndex((p) => p.label === label);

  if (index < 0) {
    res.status(404).json({ status: 404, message: "Not found." });
    return;
  }

  tags.splice(index, 1);
  req.user.tags = tags;
  req.user.save();

  res.status(200).json({
    status: 200,
    data: req.user.tags,
    message: "Deleted.",
  });
});

module.exports = {
  postTag,
  deleteTag,
  getTags,
};
