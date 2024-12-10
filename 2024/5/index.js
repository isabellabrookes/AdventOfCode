const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath, "utf8").trim().split("\n");

const parseInput = (input) => {
  const rules = [];
  const updates = [];
  let isUpdateSection = false;

  input.forEach((line) => {
    if (line.includes("|")) {
      rules.push(line.split("|").map(Number));
    } else if (line.includes(",")) {
      updates.push(line.split(",").map(Number));
    }
  });

  return { rules, updates };
};

const isUpdateValid = (update, rules) => {
  const indexMap = new Map();
  update.forEach((page, index) => indexMap.set(page, index));

  for (const [x, y] of rules) {
    if (indexMap.has(x) && indexMap.has(y)) {
      if (indexMap.get(x) > indexMap.get(y)) {
        return false;
      }
    }
  }

  return true;
};

const findMiddlePage = (update) => {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
};

const topologicalSort = (nodes, edges) => {
  const sorted = [];
  const visited = new Set();
  const temp = new Set();

  const visit = (node) => {
    if (temp.has(node)) {
      throw new Error("Graph has cycles");
    }
    if (!visited.has(node)) {
      temp.add(node);
      (edges.get(node) || []).forEach(visit);
      temp.delete(node);
      visited.add(node);
      sorted.push(node);
    }
  };

  nodes.forEach(visit);
  return sorted.reverse();
};

const correctOrder = (update, rules) => {
  const nodes = new Set(update);
  const edges = new Map();

  rules.forEach(([x, y]) => {
    if (nodes.has(x) && nodes.has(y)) {
      if (!edges.has(x)) edges.set(x, []);
      edges.get(x).push(y);
    }
  });

  return topologicalSort(Array.from(nodes), edges);
};

const part1 = (input) => {
  const { rules, updates } = parseInput(input);
  let sumOfMiddlePages = 0;

  updates.forEach((update) => {
    if (isUpdateValid(update, rules)) {
      sumOfMiddlePages += findMiddlePage(update);
    }
  });

  return sumOfMiddlePages;
};

const part2 = (input) => {
  const { rules, updates } = parseInput(input);
  let sumOfMiddlePages = 0;

  updates.forEach((update) => {
    if (!isUpdateValid(update, rules)) {
      const correctedUpdate = correctOrder(update, rules);
      sumOfMiddlePages += findMiddlePage(correctedUpdate);
    }
  });

  return sumOfMiddlePages;
};

console.log("## Day 2");
console.log("## Part 1", part1(inputFromFile));
console.log("## Part 2", part2(inputFromFile));

exports.part1 = part1;
exports.part2 = part2;
