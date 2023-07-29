const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tag = new Schema({
  label: { type: String, unique: true },
  color: { type: String },
});

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
      type: [Object],
      default: [],
    },
    tags: {
      type: [Tag],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports = { User: mongoose.model("User", UserSchema) };
