var robot = require("robotjs");
const performMove = (w, h, x, y) => {
  return new Promise((res) => {
    robot.moveMouseSmooth(x, y, 0.1);
    res(true);
  });
};
module.exports = performMove;
