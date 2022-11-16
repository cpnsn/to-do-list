const hbs = require("hbs");

hbs.registerHelper("compare", function (lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options?.hash?.operator || "==";

  var operators = {
    "==": function (l, r) {
      return l == r;
    },
    "===": function (l, r) {
      return l === r;
    },
    "!=": function (l, r) {
      return l != r;
    },
    "<": function (l, r) {
      return l < r;
    },
    ">": function (l, r) {
      return l > r;
    },
    "<=": function (l, r) {
      return l <= r;
    },
    ">=": function (l, r) {
      return l >= r;
    },
    typeof: function (l, r) {
      return typeof l == r;
    },
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[options](lvalue, rvalue);

  return result;
});
