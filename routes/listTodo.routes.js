const ListTodo = require("../models/ListTodo.model");

const router = require("express").Router();

//Delete list
router.get("/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  await ListTodo.findByIdAndDelete(id);
  res.redirect("/todos");
});

// créer une liste
router.post("/", async (req, res, next) => {
  const { title } = req.body;
  await ListTodo.create({
    author: req.session.currentUser._id,
    title,
  });
  res.redirect(`/todos`);
});

module.exports = router;
