const window = require("../modules/getL2WindowPosition");
const screenshot = require("../modules/screenShotRunner");
let counter = 1;
setInterval(async () => {
  const { left, top, right, bottom } = await window("Lymfo");
  await screenshot(left, top, right, bottom, counter);
  counter++;
}, 4000);
