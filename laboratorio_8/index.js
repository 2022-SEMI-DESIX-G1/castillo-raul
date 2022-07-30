const express = require("express");
const app = express();

const generateFibonacci = (length, array = [0, 1]) => {
  let numberOne, numberTwo;

  for (let i = array.length; i < length; i++) {
    numberOne = array[i - 1];
    numberTwo = array[i - 2];
    array.push(numberOne + numberTwo);
  }

  return array;
};

const length = 5;

app.get("/", (req, res) => {
  res.send(generateFibonacci(length));
});

app.post("/array", (req, res) => {
  res.json({ sequence: generateFibonacci(length) });
});

app.listen(5000);
