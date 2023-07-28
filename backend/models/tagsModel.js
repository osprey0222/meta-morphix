const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports.Tags = mongoose.model("Tags", TagsSchema);
