const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const expensesFromFile = fs.readFileSync(filePath);

const convertListToArray = list => {
  return list
    .toString()
    .split("\n")
    .map(a => parseInt(a, 10));
};

const part1 = expenses => {
  let entries;
  const expensesArray = convertListToArray(expenses);

  for (i=0; i < expensesArray.length; i++) {
    const first = expensesArray[i];
    for (j=0; j < expensesArray.length; j++) {
      if (j <= i) continue;
      const second = expensesArray[j];
      if (first + second === 2020) {
        entries = first * second;
        break;
      };
    };
  };

  return entries
}

const part2 = expenses => {
  let entries;
  const expensesArray = convertListToArray(expenses);

  for (i=0; i < expensesArray.length; i++) {
    const first = expensesArray[i];
    for (j=0; j < expensesArray.length; j++) {
      if (j <= i) continue;
      const second = expensesArray[j];
      for (k=0; k < expensesArray.length; k++) {
      if (k <= i || k <= j ) continue;
      const third = expensesArray[k];
      if (first + second + third === 2020) {
        entries = first * second * third;
        break;
      };
    };
    };
  };

  return entries
}

console.log("## Day 1" );
console.log("## Part 1", part1(expensesFromFile));
console.log("## Part 2", part2(expensesFromFile));

exports.part1 = part1;