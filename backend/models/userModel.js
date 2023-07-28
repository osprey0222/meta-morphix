const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: Number,
      reqquired: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    dayPlans: {
      type: [ObjectId],
      default: [],
    },
    tags: {
      type: [ObjectId],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports.User = mongoose.model("User", UserSchema);
