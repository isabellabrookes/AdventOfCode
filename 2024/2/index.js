const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath);

const convertFileToArray = (file) => {
  const reports = file.toString().split("\n");
  return reports.map((a, i) => {
    return a.split(" ").map(Number);
  });
};

const part1 = (input) => {
  const reports = convertFileToArray(input);
  let safe = 0;

  const isIncrementingOrDecrementing = (array) => {
    let incrementing = 0;
    let decrementing = 0;
    array.forEach((currentLevel, i) => {
      if (i < array.length - 1) {
        const nextLevel = array[i + 1];
        if (currentLevel < nextLevel) {
          incrementing++;
        } else if (currentLevel > nextLevel) {
          decrementing++;
        }
      }
    });
    return (
      incrementing === array.length - 1 || decrementing === array.length - 1
    );
  };

  const isSafe = (array) => {
    levelSafety = [];
    array.forEach((currentLevel, i) => {
      if (i < array.length - 1) {
        const nextLevel = array[i + 1];
        const leveldifference = currentLevel - nextLevel;
        if (
          (leveldifference >= -3 && leveldifference < 0) ||
          (leveldifference <= 3 && leveldifference > 0)
        ) {
          levelSafety.push(true);
        } else {
          levelSafety.push(false);
        }
      }
    });
    return levelSafety.every((a) => a === true);
  };

  reports.forEach((a) => {
    if (isIncrementingOrDecrementing(a) && isSafe(a)) {
      safe++;
    }
  });
  return safe;
};

const part2 = (input) => {
  const reports = convertFileToArray(input);
  let safe = 0;

  function isSafeReport(levels) {
    for (let i = 0; i < levels.length - 1; i++) {
      const diff = levels[i + 1] - levels[i];
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        return false;
      }
    }
    return true;
  }

  function isIncrementingOrDecrementing(levels) {
    const isIncrementing = levels.every(
      (val, i, arr) => i === 0 || val >= arr[i - 1]
    );
    const isDecrementing = levels.every(
      (val, i, arr) => i === 0 || val <= arr[i - 1]
    );
    return isIncrementing || isDecrementing;
  }

  function canBeSafeWithDampener(levels) {
    for (let i = 0; i < levels.length; i++) {
      const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (isIncrementingOrDecrementing(newLevels) && isSafeReport(newLevels)) {
        return true;
      }
    }
    return false;
  }

  function countSafeReports(reports) {
    let safeCount = 0;

    reports.forEach((report) => {
      if (isIncrementingOrDecrementing(report) && isSafeReport(report)) {
        safeCount++;
      } else if (canBeSafeWithDampener(report)) {
        safeCount++;
      }
    });

    return safeCount;
  }

  return countSafeReports(reports);
};

console.log("## Day 2");
console.log("## Part 1", part1(inputFromFile));
console.log("## Part 2", part2(inputFromFile));

exports.part1 = part1;
exports.part2 = part2;
