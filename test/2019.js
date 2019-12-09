/* eslint-disable no-undef */
/* eslint-disable func-names */
const assert = require("assert");
const { day1Part1, day1Part2 } = require("../2019/1/");

describe("2019", function() {
  describe("Day 1 - Part 1", function() {
    it("Should return 2 when given a value of 12", function() {
      assert.equal(day1Part1([12]), 2);
    });
    it("Should return 2 when given a value of 14", function() {
      assert.equal(day1Part1([14]), 2);
    });
    it("Should return 654 when given a value of 1969", function() {
      assert.equal(day1Part1([1969]), 654);
    });
    it("Should return 33583 when given a value of 100756", function() {
      assert.equal(day1Part1([1969]), 654);
    });
  });

  describe("Day 1 - Part 2", function() {
    it("Should return 2 when given a value of 12", function() {
      assert.equal(day1Part2([12]), 2);
    });
    it("Should return 966 when given a value of 1969", function() {
      assert.equal(day1Part2([1969]), 966);
    });
    it("Should return 50346 when given a value of 100756", function() {
      assert.equal(day1Part2([100756]), 50346);
    });
  });
});
