const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const DayPlannerSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    timeTable: {
      type: [
        {
          complete: Boolean,
          to: Date,
          from: Date,
          tag: ObjectId,
          info: String,
        },
      ],
    },
    sides: {
      type: [String],
    },
    priorities: {
      type: [String],
    },
    importantNote: {
      type: String,
    },
    generalNote: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports.DayPlanner = mongoose.model("DayPlanner", DayPlannerSchema);
