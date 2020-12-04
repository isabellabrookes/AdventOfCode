const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
const inputFromFile = fs.readFileSync(filePath);

const convertFileToArray = file => {
  return file
    .toString()
    .split("\n\n")
    .map(a => { 
      return Object.fromEntries( 
       a.replace(/\n/g, " ")
      .split(" ")
      .map(b => b.split(":"))
      )
    }
    )
  };

const part1 = input => {
  const passports = convertFileToArray(input);
  let validPassports = 0;

  passports.forEach(a => {
    const byrValid = !!a.byr;
    const iyrValid = !!a.iyr;
    const eyrValid = !!a.eyr;
    const hgtValid = !!a.hgt;
    const hclValid = !!a.hcl;
    const eclValid = !!a.ecl;
    const pidValid = !!a.pid;
    if (byrValid 
      && iyrValid 
      && eyrValid 
      && hgtValid 
      && hclValid 
      && eclValid 
      && pidValid) {
      validPassports++;
    }
  })

  return validPassports
}

const part2 = input => {
  const passports = convertFileToArray(input);
  let validPassports = 0;
  const getHeightRequirements = (height) => {
    const type = height.substring(height.length - 2, height.length);
    const number = parseInt(height.substring(0, height.length - 2));
    switch(type){
      case "cm":
        if (number >= 150 && number <= 193 ) {
          return true;
        }
        return false;
      case "in":
        if (number >= 59 && number <= 76 ) {
          return true;
        }
        return false;
      default: 
       return false;
    } 
  }

  const getMatchValidity = (string, regex) => {
    const reg = new RegExp(regex, "g");
    const match = string.match(reg);
    
    if (match && match.length > 0) {
      return true
    }
    return false;
  }

  passports.forEach(a => {
    const byrValid = !!a.byr && (a.byr >= 1920 && a.byr <= 2002);
    const iyrValid = !!a.iyr && (a.iyr >= 2010 && a.iyr <= 2020);
    const eyrValid = !!a.eyr && (a.eyr >= 2020 && a.eyr <= 2030);
    const hgtValid = !!a.hgt && getHeightRequirements(a.hgt);
    const hclValid = !!a.hcl && getMatchValidity(a.hcl, "^[#][a-f0-9]{6}$");
    const eclValid = !!a.ecl && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(a.ecl);
    const pidValid = !!a.pid && getMatchValidity(a.pid, "^[0-9]{9}$");
    // console.log(`byrValid: ${byrValid}, iyrValid: ${iyrValid}, eyrValid: ${eyrValid}, hgtValid: ${hgtValid}, eclValid: ${eclValid}, pidValid: ${pidValid}`)
    if (byrValid 
      && iyrValid 
      && eyrValid 
      && hgtValid 
      && hclValid 
      && eclValid 
      && pidValid) {
      validPassports++;
    }
  })

  return validPassports
}

console.log("## Day 4" );
console.log("## Part 1", part1(inputFromFile));
console.log("## Part 2", part2(inputFromFile));

exports.part1 = part1;
exports.part2 = part2;