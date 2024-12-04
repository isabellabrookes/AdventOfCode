const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath, "utf8");

const part1 = (input) => {
  const convertFileToArray = (file) => {
    const regex = /mul\((\d+)\,(\d+)\)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(file)) !== null) {
      matches.push([Number(match[1]), Number(match[2])]);
    }

    return matches;
  };
  const reports = convertFileToArray(input);
  return reports.reduce((acc, report) => {
    return acc + report[0] * report[1];
  }, 0);
};

const part2 = (input) => {
  const convertFileToArray = (file) => {
    const regex = /mul\((\d+)\,(\d+)\)/g;
    const matches = [];
    let match;
    let isDisabled = false;

    // Split the file content into parts based on "don't()" and "do()"
    const parts = file.split(/(don't\(\)|do\(\))/);

    parts.forEach((part) => {
      if (part === "don't()") {
        isDisabled = true;
      } else if (part === "do()") {
        isDisabled = false;
      } else if (!isDisabled) {
        // Find all "mul" matches in the current part
        while ((match = regex.exec(part)) !== null) {
          matches.push([Number(match[1]), Number(match[2])]);
        }
      }
    });

    return matches;
  };
  const reports = convertFileToArray(input);
  return reports.reduce((acc, report) => {
    return acc + report[0] * report[1];
  }, 0);
};

console.log("## Day 2");
console.log("## Part 1", part1(inputFromFile));
console.log("## Part 2", part2(inputFromFile));

exports.part1 = part1;
exports.part2 = part2;
