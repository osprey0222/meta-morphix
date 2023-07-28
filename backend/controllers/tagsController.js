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
  const tagIds = req.user.tags;

  if (tagIds) {
    const tags = await Tags.find({ _id: { $in: tagIds } }).select(
      "label color"
    );

    res.status(200).json({
      status: 200,
      data: tags,
      message: "Fetched.",
    });
  } else {
    res.status(400).json({ status: 400, message: "Somthing went wrong." });
  }
});

// @CREATE : Create new Tag
// Create
const postTag = asyncHandler(async (req, res) => {
  const { label, color } = req.body.data;
  const tag = await Tags.create({ label, color });

  if (tag) {
    req.user.tags.push(tag.id);
    req.user.save();

    res.status(200).json({
      status: 200,
      data: tag,
      message: "Posted new Tag.",
    });
  } else {
    res.status(400).json({ status: 400, message: "Somthing went wrong." });
  }
});

// @DELETE
// Delete Tag
const deleteTag = asyncHandler(async (req, res) => {
  const { tagId: id } = req.params;

  const tags = req.user.tags;
  const index = tags.indexOf(id);

  if (index < 0) {
    res.status(404).json({ status: 404, message: "Not found." });
    return;
  }

  tags.splice(index, 1);
  req.user.tags = tags;
  req.user.save();

  const deleted = await Tags.findOneAndDelete({ _id: id });

  if (deleted) {
    res.status(200).json({
      status: 200,
      data: deleted,
      message: "Deleted.",
    });
  } else {
    res.status(400).json({ status: 400, message: "Somthing went wrong." });
  }
});

module.exports = {
  postTag,
  deleteTag,
  getTags,
};
