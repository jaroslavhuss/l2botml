// ES6 Destructuring Assignment
const { Screenshot, ImageFormat } = require("win-screenshot");
const fs = require("fs");
const makeScreenshot = async (x1, y1, x2, y2, counter) => {
  return new Promise((res) => {
    Screenshot.captureByCoordinates({
      coords: {
        x1,
        y1,
        x2,
        y2,
      },
      imageFormat: ImageFormat.JPEG,
    }).then((response) => {
      fs.writeFileSync(
        "../cruma/" + counter + ".jpg",
        Buffer.from(response.imageBuffer, "base64")
      );
      res(true);
    });
  });
};
module.exports = makeScreenshot;
