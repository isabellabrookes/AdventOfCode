const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath);

const convertListToArray = list => {
  return list
    .toString()
    .split(",")
    .map(a => parseInt(a, 10));
};

const part1 = intcodes => {
  let array = convertListToArray(intcodes);
  array[1] = 12;
  array[2] = 2;
  let i = 0;
  while (i < array.length){
    let code = array[i];
    let setter = array[i+3];
    let first = array[array[i+1]];
    let second = array[array[i+2]];
    if (code === 99) array[0];
    if (code === 1) {
      array[setter] = first + second;
    }
    if (code === 2){
      array[setter] = first * second;
    }
    i = i + 4;
  };
  return array[0];
};

const part2 = intcodes => {
  let array = convertListToArray(intcodes);
  let i = 0;
  for (noun = 0; noun <= 99; noun++ ){
    for (verb = 0; verb <= 99; verb++ ) {
      while (i < array.length){
        array[1] = noun;
        array[2] = verb;
        let code = array[i];
        let setter = array[i+3];
        let first = array[array[i+1]];
        let second = array[array[i+2]];
        if (code === 99) {
          if (array[0] === 19690720) {
            return (100 * noun) + verb;
          }
          array = convertListToArray(intcodes);
          i = 0;
          break;
        };
        if (code === 1) {
          array[setter] = first + second;
        }
        if (code === 2){
          array[setter] = first * second;
        }
        i = i + 4;
      }
    }
  }

};

console.log("## Day 2");
console.log("Part 1: ", part1(inputFromFile));
console.log("Part 2: ", part2(inputFromFile));

exports.day2Part1 = part1;
exports.day2Part2 = part2;
