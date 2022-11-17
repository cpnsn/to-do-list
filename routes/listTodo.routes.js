const ListTodo = require("../models/ListTodo.model");

const router = require("express").Router();

//Delete list
router.get("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await ListTodo.findByIdAndDelete(id);
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

//axios update list title
router.post("/:id/update", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    await ListTodo.findByIdAndUpdate(id, { title });
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

// créer une liste
router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    await ListTodo.create({
      author: req.session.currentUser._id,
      title,
    });
    res.redirect(`/todos`);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
