// ES6 Destructuring Assignment
const { Screenshot, ImageFormat } = require("win-screenshot");
const axios = require("axios");
const makeScreenshot = async (x1, y1, x2, y2, UBUNTU_SERVER_URL) => {
  return new Promise((res) => {
    Screenshot.captureByCoordinates({
      coords: {
        x1,
        y1,
        x2,
        y2,
      },
      imageFormat: ImageFormat.JPEG,
    }).then(async (imagedata) => {
      await axios
        .post(UBUNTU_SERVER_URL + "/image", {
          imageData: imagedata.imageBuffer,
        })
        .then(function (response) {
          res(response);
        });
    });
  });
};
module.exports = makeScreenshot;
