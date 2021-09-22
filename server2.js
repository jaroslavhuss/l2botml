/**
 * IMPORTS
 */
const L2Window = require("./modules/getL2WindowPosition");
const screenShot = require("./modules/makeScreenshotAndGetCoordinates");
const move = require("./modules/mouseapi");
const click = require("./modules/portCommunication");
const buffer = require("./modules/bufferController");
const axios = require("axios");
/**
 * C   O   N   F   I   G
 * =========================================
 * THE MOST IMPORTANT BLOCK OF THE CODE FUCKING FILIP!
 */
const UBUNTU_SERVER_URL = "http://10.0.1.25:5432"; //When WSL2 started, the program will tell you the URL
const NAME_OF_CHARACTER = "Lymfo"; // Look at L2 window
const NAME_OF_BUFFER_CHARACTER = "Herpes";

/**
 * =========================================
 */
/**
 * Main Thread
 */
//Main thread core variables

let counter = 0;
let searching = 0;
let followCounter = 0;
let buffCounter = 0;
const mainThread = async () => {
  counter++;
  followCounter++;
  buffCounter++;
  const { left, top, right, bottom } = await L2Window(NAME_OF_CHARACTER);
  const { data } = await screenShot(
    left,
    top,
    right,
    bottom,
    UBUNTU_SERVER_URL
  );
  if (data.length > 0) {
    const { w, h, x, y } = data[0].box;
    const wasMoved = await move(w, h, x, y);
    if (wasMoved) {
      const wasClicked = await click("click");
      searching = 0;
      if (wasClicked) {
        setTimeout(() => {
          mainThread();
        }, 1000);
      }
    }
  } else {
    searching++;
    if (searching > 5) {
      searching = 0;
      const unstuck = await click("unstuck");
      if (unstuck) {
        setTimeout(() => {
          mainThread();
        }, 1000);
      }
    } else {
      if (buffCounter > 65) {
        buffCounter = 0;
        manaMainCharacter();
      } else {
        const wasMoved = await click("move");
        if (wasMoved) {
          setTimeout(() => {
            mainThread();
          }, 1000);
        }
      }
    }
  }
};
const followMainCharacterLogic = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("follow");
  setTimeout(() => {
    mainThread();
  }, 2000);
};
const healMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("heal");
  setTimeout(() => {
    mainThread();
  }, 2000);
};
const buffMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("buff");
  setTimeout(() => {
    mainThread();
  }, 2000);
};
const manaMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("mana");
  setTimeout(() => {
    mainThread();
  }, 2000);
};
const main = async () => {
  followMainCharacterLogic();
  setTimeout(() => {
    mainThread();
  }, 2000);
};
main();
