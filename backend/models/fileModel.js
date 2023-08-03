const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const File = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: { type: String },
    size: { type: Number },
    downloadURL: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports = { File: mongoose.model("File", File) };
