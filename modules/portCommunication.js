const SerialPort = require("serialport");
const port = new SerialPort("COM3", { baudRate: 9600 });
const makeAMouseClick = (event) => {
  return new Promise((res) => {
    port.write(event, (err) => {
      if (err) {
        return console.log("Error on write: ", err.message);
      }
      res(true);
    });
  });
};
module.exports = makeAMouseClick;
