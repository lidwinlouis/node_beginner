
//one of exporting modules
//exports.random = () => Math.random();

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

//second way of exporting modules
module.exports = { add, subtract, multiply, divide };