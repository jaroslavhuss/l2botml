var robot = require("robotjs");
const performMove = (w,h,x,y) => {
    return new Promise((res) => {
        robot.moveMouseSmooth(x,y,1);
        res(true);
    })
}
module.exports = performMove;