const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath);

const convertFileToArray1 = (file) => {
  const lines = file.toString().trim().split("\n");
  let left = [];
  let right = [];
  lines.forEach((a) => {
    const split = a.split(/\s+/);
    left.push(split[0]);
    right.push(split[1]);
  });
  left = left.sort();
  right = right.sort();
  return left.map((a, i) => [a, right[i]]);
};

const convertFileToArray2 = (file) => {
  const lines = file.toString().trim().split("\n");
  let left = [];
  let right = [];
  lines.forEach((a) => {
    const split = a.split(/\s+/);
    left.push(split[0]);
    right.push(split[1]);
  });
  return [left, right];
};

const part1 = (input) => {
  const pairs = convertFileToArray1(input);
  let sum = 0;
  for (i = 0; i < pairs.length; i++) {
    pair = pairs[i].sort();
    sum = sum + (pair[1] - pair[0]);
    console.log("sum", sum);
    continue;
  }
  return sum;
};

const part2 = (input) => {
  const [left, right] = convertFileToArray2(input);
  let sum = 0;
  left.forEach((a, i) => {
    similar = 0;
    right.forEach((b, j) => {
      if (a === b) {
        similar += 1;
      }
    });
    sum = sum + a * similar;
  });
  return sum;
};

console.log("## Day 1");
console.log("## part1", part1(inputFromFile));
console.log("## part2", part2(inputFromFile));

exports.part1 = part1;
exports.part2 = part2;
