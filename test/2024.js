/* eslint-disable no-undef */
/* eslint-disable func-names */
const assert = require("assert");
const { part1, part2 } = require("../2024/1");

const day1Input = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

describe("2024", function () {
  describe("Day 1", function () {
    it("Should return 11 when given text", function () {
      assert.equal(part1(day1Input), 11);
    });
    it("Should return 31 when given text", function () {
      assert.equal(part2(day1Input), 31);
    });
  });

  // describe("Day 1 - Part 2", function() {
  //   it("Should return 2 when given a value of 12", function() {
  //     assert.equal(day1Part2(12), 2);
  //   });
  //   it("Should return 966 when given a value of 1969", function() {
  //     assert.equal(day1Part2(1969), 966);
  //   });
  //   it("Should return 50346 when given a value of 100756", function() {
  //     assert.equal(day1Part2(100756), 50346);
  //   });
  // });

  // describe("Day 2 - Part 1", function() {
  //   it("Should return 2,0,0,0,99 when given a value of 1,0,0,0,99", function() {
  //     assert.equal(day2Part1("1, 0, 0, 0, 99"), [2, 0, 0, 0, 99]);
  //   });
  // });
});
