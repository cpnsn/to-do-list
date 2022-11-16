/**
 * List:
 * Title
 * author
 * [Task]
 */

const { Schema, model } = require("mongoose");

const listTodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const ListTodo = model("ListTodo", listTodoSchema);

module.exports = ListTodo;
