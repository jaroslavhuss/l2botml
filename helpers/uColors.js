const fs = require("fs");
const data = fs.readFileSync("mpcolors.txt", "utf8");
const array = data.toString().split("\n");
const doneArray = [...new Set(array)];
console.log(doneArray)
