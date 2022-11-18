const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/todos", require("./todos.route.js"));
router.use("/list", require("./listTodo.routes"));

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    // style: ["home.css", "about.css"],
  });
});

module.exports = router;
