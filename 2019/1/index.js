const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const modulesFromFile = fs.readFileSync(filePath);

const convertListToArray = list => {
  return list
    .toString()
    .split("\n")
    .map(a => parseInt(a, 10));
};

const part1 = modules => {
  const fuelRequirements = module => Math.floor(module / 3) - 2;
  const total = convertListToArray(modules)
    .map(module => fuelRequirements(module))
    .reduce((a, b) => a + b, 0);
  return total;
};

const part2 = modules => {
  let totalFuelRequired = 0;
  const fuelRequirements = module => {
    const moduleInt = module;
    const fuelRequired = Math.floor(moduleInt / 3) - 2;
    if (fuelRequired <= 0) return totalFuelRequired;
    totalFuelRequired += fuelRequired;
    return fuelRequirements(fuelRequired);
  };
  const total = convertListToArray(modules)
    .map(module => {
      const result = fuelRequirements(module);
      totalFuelRequired = 0;
      return result;
    })
    .reduce((a, b) => a + b, 0);
  return total;
};

console.log("#2019");
console.log("## Day 1");
console.log("Part 1: ", part1(modulesFromFile));
console.log("Part 2: ", part2(modulesFromFile));

exports.day1Part1 = part1;
exports.day1Part2 = part2;
