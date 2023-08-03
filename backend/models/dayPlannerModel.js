const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeTableSchema = new Schema({
  complete: { type: Boolean, required: true, default: false },
  to: { type: Date, required: true },
  from: { type: Date, required: true },
  info: { type: String, default: "" },
  tag: { type: ObjectId },
});

const DayPlannerSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    timeTable: { type: [TimeTableSchema] },
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
