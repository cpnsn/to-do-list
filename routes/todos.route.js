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

//ajouter todo à une liste
router.post("/:id", async (req, res, next) => {
  try {
    const { content } = req.body;
    const id = req.params.id;
    const newList = await Todo.create({
      user: req.session.currentUser._id,
      content,
    });
    await ListTodo.findByIdAndUpdate(id, { $push: { todos: newList.id } });
    res.redirect(`/todos`);
  } catch (error) {
    next(error);
  }
});

//supprimer todo d'une liste
router.get("/:id/delete", async (req, res, next) => {
  try {
    const oneTask = await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

//afficher todo done dans "done tasks"
router.get("/:id/update", async (req, res, next) => {
  try {
    const updateDone = await Todo.findByIdAndUpdate(req.params.id, {
      done: true,
    });
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

//vider section "done tasks"
router.get("/delete-all", async (req, res, next) => {
  try {
    const deleteAllDone = await Todo.deleteMany({ done: true });
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
