function add(a, b) {
  console.log(a + b);
}

function sub(a, b) {
  console.log(a - b);
}

// exports.add = (a, b)=> a + b;
// exports.sub = (a, b)=> a - b;

module.exports = { add, sub };
