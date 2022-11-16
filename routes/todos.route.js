const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const ListTodo = require("../models/ListTodo.model");
const Todo = require("../models/Todo.model");
const router = express.Router();

router.get("/", isLoggedIn, async (req, res) => {
  const allLists = (
    await ListTodo.find({
      author: req.session.currentUser._id,
    }).populate("todos")
  ).map((list) => {
    list.todos = list.todos.filter((todo) => !todo.done);
    return list;
  });
  const doneTasks = await Todo.find({
    user: req.session.currentUser._id,
    done: true,
  });
  res.render("todos", {
    title: "Todos",
    allLists,
    doneTasks,
  });
});

// router.get("/:id([a-f0-9]{24,})", async (req, res, next) => {
//   const { id } = req.params;
//   const oneTodo = await Todo.findById(id);
//   res.render("oneTodo", { oneTodo });
// });

//ajouter todo à une liste
router.post("/:id", async (req, res, next) => {
  const { content } = req.body;
  const id = req.params.id;
  const newList = await Todo.create({
    user: req.session.currentUser._id,
    content,
  });
  await ListTodo.findByIdAndUpdate(id, { $push: { todos: newList.id } });
  res.redirect(`/todos`);
});

//supprimer todo d'une liste
router.get("/:id/delete", async (req, res, next) => {
  const oneTask = await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/todos");
});

//afficher todo done dans "done tasks"
router.get("/:id/update", async (req, res, next) => {
  const updateDone = await Todo.findByIdAndUpdate(req.params.id, {
    done: true,
  });
  res.redirect("/todos");
});

// router.post("/", async (req, res, next) => {
//   const { content } = req.body;
//   const newDoneTask = await Todo.create({
//     user: req.session.currentUser._id,
//     content,
//     done: true,
//   });
//   res.redirect(`/todos`);
// });

// router.get("/:id/update", async (req, res, next) => {
//   try {
//     const myTask = await Todo.findById(req.params.id);

//     res.render("updateTask", { myTask });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/:id/update", async (req, res, next) => {
//   try {
//     const updatedTask = await Todo.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.redirect("/todos");
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
