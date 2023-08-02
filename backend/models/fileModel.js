const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const File = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports = { File: mongoose.model("File", File) };
