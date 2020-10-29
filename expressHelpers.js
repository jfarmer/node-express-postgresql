// By default, Handlebars doesn't let you do much in the way of logic
// To do more complex things, you have to define helper functions and
// then make them available to Handlebars.
//
// Here are some helper functions

function eq(x, y) {
  return x === y;
}

function neq(x, y) {
  return x !== y;
}

// Convert '5.6897123' to '5.68'
function toCents(str) {
  return Number(str).toFixed(2);
}

// Used to toggle between two values, e.g.,
//   toggle('ASC', 'ASC', 'DESC'); // => 'DESC'
//   toggle('DESC', 'ASC', 'DESC'); // => 'ASC'
function toggle(val, first, second) {
  if (val === first) {
    return second;
  } else {
    return first;
  }
}

module.exports = {
  eq,
  neq,
  toCents,
  toggle
}
