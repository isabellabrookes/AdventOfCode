const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath, "utf8");

const convertFileToMap = (file) => {
  // take file and convert to map where key is the coordinates and value is the value
  const map = new Map();
  const lines = file.split("\n");
  lines.forEach((line, y) => {
    const letters = line.split("");
    letters.forEach((letter, x) => {
      map.set(`${x},${y}`, letter);
    });
  });

  return map;
};

const part1 = (input) => {
  const map = convertFileToMap(input);
  let matches = 0;

  isXMAS = (array) => {
    const word = array.join("");
    return word === "XMAS";
  };

  leftToRight = (map, x, y) => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(map.get(`${x + i},${y}`));
    }
    return isXMAS(array);
  };

  rightToLeft = (map, x, y) => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(map.get(`${x - i},${y}`));
    }
    return isXMAS(array);
  };

  topToBottom = (map, x, y) => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(map.get(`${x},${y + i}`));
    }
    return isXMAS(array);
  };

  bottomToTop = (map, x, y) => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(map.get(`${x},${y - i}`));
    }
    return isXMAS(array);
  };

  diagonalTopLeftToBottomRight = (map, x, y) => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(map.get(`${x + i},${y + i}`));
    }
    return isXMAS(array);
  };

  diagonalTopRightToBottomLeft = (map, x, y) => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(map.get(`${x - i},${y + i}`));
    }
    return isXMAS(array);
  };

  diagonalBottomLeftToTopRight = (map, x, y) => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(map.get(`${x + i},${y - i}`));
    }
    return isXMAS(array);
  };

  diagonalBottomRightToTopLeft = (map, x, y) => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(map.get(`${x - i},${y - i}`));
    }
    return isXMAS(array);
  };
  // iterate over the map and check the 8 directions for "XMAS"
  for (let [key, value] of map) {
    const [x, y] = key.split(",").map(Number);

    if (leftToRight(map, x, y)) {
      matches++;
    }
    if (rightToLeft(map, x, y)) {
      matches++;
    }
    if (topToBottom(map, x, y)) {
      matches++;
    }
    if (bottomToTop(map, x, y)) {
      matches++;
    }
    if (diagonalTopLeftToBottomRight(map, x, y)) {
      matches++;
    }
    if (diagonalTopRightToBottomLeft(map, x, y)) {
      matches++;
    }
    if (diagonalBottomLeftToTopRight(map, x, y)) {
      matches++;
    }
    if (diagonalBottomRightToTopLeft(map, x, y)) {
      matches++;
    }
  }
  return matches;
};

const part2 = (input) => {
  const map = convertFileToMap(input);
  let matches = 0;

  getTopLeft = (map, x, y) => {
    return map.get(`${x - 1},${y - 1}`);
  };

  getTopRight = (map, x, y) => {
    return map.get(`${x + 1},${y - 1}`);
  };

  getBottomLeft = (map, x, y) => {
    return map.get(`${x - 1},${y + 1}`);
  };

  getBottomRight = (map, x, y) => {
    return map.get(`${x + 1},${y + 1}`);
  };

  diagonalTopLeftToBottomRight = (map, x, y) => {
    return getTopLeft(map, x, y) === "M" && getBottomRight(map, x, y) === "S";
  };

  diagonalTopRightToBottomLeft = (map, x, y) => {
    return getTopRight(map, x, y) === "M" && getBottomLeft(map, x, y) === "S";
  };

  diagonalBottomLeftToTopRight = (map, x, y) => {
    return getBottomLeft(map, x, y) === "M" && getTopRight(map, x, y) === "S";
  };

  diagonalBottomRightToTopLeft = (map, x, y) => {
    return getBottomRight(map, x, y) === "M" && getTopLeft(map, x, y) === "S";
  };

  for (let [key, value] of map) {
    const [x, y] = key.split(",").map(Number);

    if (value === "A") {
      if (
        (diagonalTopLeftToBottomRight(map, x, y) &&
          diagonalTopRightToBottomLeft(map, x, y)) ||
        (diagonalTopLeftToBottomRight(map, x, y) &&
          diagonalBottomLeftToTopRight(map, x, y)) ||
        (diagonalBottomRightToTopLeft(map, x, y) &&
          diagonalTopRightToBottomLeft(map, x, y)) ||
        (diagonalBottomRightToTopLeft(map, x, y) &&
          diagonalBottomLeftToTopRight(map, x, y))
      ) {
        matches++;
      }
    }
  }
  return matches;
};

console.log("## Day 2");
console.log("## Part 1", part1(inputFromFile));
console.log("## Part 2", part2(inputFromFile));

exports.part1 = part1;
exports.part2 = part2;
