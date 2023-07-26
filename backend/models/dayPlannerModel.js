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
          complete: { type: Boolean, required: true, default: false },
          to: { type: Date },
          from: { type: Date },
          tag: { type: ObjectId },
          info: { type: String },
        },
      ],
    },
    sides: {
      type: [String],
      default: ["", "", ""],
    },
    priorities: {
      type: [String],
      default: ["", "", ""],
    },
    importantNote: {
      type: String,
      default: "",
    },
    generalNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, versionKey: false }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports.DayPlanner = mongoose.model("DayPlanner", DayPlannerSchema);
