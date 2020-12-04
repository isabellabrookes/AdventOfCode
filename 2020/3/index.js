const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath);

const convertFileToArray = file => {
  return file
    .toString()
    .split("\n")
    .map(a => a.split(""))
};

const checkForTrees = (map, x, y, trees, incrementX, incrementY) => {
  let xCoord = x;
  let yCoord = y;
  let treeCount = trees;

  let patternLength = map[yCoord].length;
  if (map[yCoord][xCoord] === "#") {
    treeCount++;
  }
  xCoord = xCoord + incrementX;  
  yCoord = yCoord + incrementY;  
  if (xCoord > patternLength - 1) {
    xCoord = xCoord - patternLength;
  }
  if (yCoord < map.length) {
    return checkForTrees(map, xCoord, yCoord, treeCount, incrementX, incrementY);
  }
  return treeCount;
}

const part1 = input => {
  const map = convertFileToArray(input);
  return checkForTrees(map, 0, 0, 0, 3, 1);
}

const part2 = input => {
  const map = convertFileToArray(input);
// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
  const a = checkForTrees(map, 0, 0, 0, 1, 1);
  const b = checkForTrees(map, 0, 0, 0, 3, 1);
  const c = checkForTrees(map, 0, 0, 0, 5, 1);
  const d = checkForTrees(map, 0, 0, 0, 7, 1);
  const e = checkForTrees(map, 0, 0, 0, 1, 2);
  return a *  b * c * d * e;
}

console.log("## Day 3" );
console.log("## Part 1", part1(inputFromFile));
console.log("## Part 2", part2(inputFromFile));

exports.part1 = part1;
exports.part2 = part2;