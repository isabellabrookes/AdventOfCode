const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath);

const convertFileToArray = file => {
  return file
    .toString()
    .split("\n")
    .map(a => {
      return a.replace("-", " ")
      .replace(":", "")
      .split(" ");
    });
};


const part1 = input => {
  const array = convertFileToArray(input);
  let count = 0;
  const passwordCheck = (lowest, highest, matching, string) => {
    const regex = new RegExp(matching, "g");
    const matches = (string.match(regex) || []).length;
    if (matches >= lowest && matches <= highest) count++;
  }

  array.forEach(a => passwordCheck(a[0], a[1], a[2], a[3]))

  return count;
}

const part2 = input => {
  const array = convertFileToArray(input);
  let count = 0;
  const passwordCheck = (first, second, matching, string) => {
    const stringArray = string.split("");
    const firstMatch = stringArray[first-1] === matching;
    const secondMatch = stringArray[second-1] === matching;
    if ((firstMatch || secondMatch) && !(firstMatch && secondMatch)) count++;
  }
  array.forEach(a => passwordCheck(parseInt(a[0]), parseInt(a[1]), a[2], a[3]))

  return count;
}

console.log("## Day 1" );
console.log("## Part 1", part1(inputFromFile));
console.log("## Part 2", part2(inputFromFile));

exports.part1 = part1;
exports.part2 = part2;