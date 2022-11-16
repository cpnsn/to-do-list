const { Schema, model } = require("mongoose");

const listSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const List = model("Todo", listSchema);

module.exports = List;
