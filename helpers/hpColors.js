const {getMousePos,getPixelColor} = require("robotjs");
const fs = require("fs");

setInterval(() => {
    const {x,y} = getMousePos();
    fs.appendFileSync("mpcolors.txt", getPixelColor(x,y).toString()+"\n");
},100)