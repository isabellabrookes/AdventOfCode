const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

const day1 = () => {
  const fuelRequirements = module => Math.floor(module / 3) - 2;

  const total = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map(a => fuelRequirements(a))
    .reduce((a, b) => a + b, 0);

  return total;
};

console.log("## Day 1");
console.log(day1());

exports.module = day1;
