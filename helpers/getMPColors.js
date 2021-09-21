const { getMousePos, getPixelColor } = require("robotjs");
const fs = require("fs");

const getColors = () => {
  const { x, y } = getMousePos();
  fs.appendFileSync("mpcolors.txt", getPixelColor(x, y).toString() + "\n");
};

setInterval(() => {
  getColors();
}, 300);
