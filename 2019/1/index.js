const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const modules = fs
  .readFileSync(filePath)
  .toString()
  .split("\n");
// const modules = ["1969", "100756"];

const part1 = () => {
  const fuelRequirements = module => Math.floor(module / 3) - 2;
  const total = modules
    .map(module => fuelRequirements(module))
    .reduce((a, b) => a + b, 0);

  return total;
};

const part2 = () => {
  let totalFuelRequired = 0;
  const fuelRequirements = module => {
    const moduleInt = parseInt(module, 10);
    const fuelRequired = Math.floor(moduleInt / 3) - 2;
    if (fuelRequired <= 0) return totalFuelRequired;
    totalFuelRequired += fuelRequired;
    return fuelRequirements(fuelRequired);
  };
  const total = modules
    .map(module => {
      const result = fuelRequirements(module);
      totalFuelRequired = 0;
      return result;
    })
    .reduce((a, b) => a + b, 0);

  return total;
};

console.log("## Day 1");
console.log("Part 1: ", part1());
console.log("Part 2: ", part2());
