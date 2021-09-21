/**
 * IMPORTS
 */
const L2Window = require("./modules/getL2WindowPosition");
const screenShot = require("./modules/makeScreenshot");
const move = require("./modules/mouseapi");
const click = require("./modules/portCommunication");
const buffer = require("./modules/bufferController");
const axios = require("axios");
/**
 * C   O   N   F   I   G
 * =========================================
 * THE MOST IMPORTANT BLOCK OF THE CODE FUCKING FILIP!
 */
const WSL2_SERVER_URL = "172.17.167.219"; //When WSL2 started, the program will tell you the URL
const NAME_OF_CHARACTER = "Lymfo"; // Look at L2 window
const NAME_OF_BUFFER_CHARACTER = "Herpes";
const PATH_TO_THE_WSL2 =
  "//wsl$/Ubuntu-20.04/home/jaroslavhuss/l2ubuntu/current.jpg"; //__DIR to WSL2

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
  console.log("Hledám: ", searching);
  counter++;
  followCounter++;
  buffCounter++;
  const { left, top, right, bottom } = await L2Window(NAME_OF_CHARACTER);
  await screenShot(left, top, right, bottom, PATH_TO_THE_WSL2);
  const { data } = await axios.post("http://" + WSL2_SERVER_URL + ":5432/");
  if (data.length > 0) {
    const { w, h, x, y } = data[0].box;
    const wasMoved = await move(w, h, x, y);
    if (wasMoved) {
      const wasClicked = await click("click");
      searching = 0;
      if (wasClicked) {
        mainThread();
      }
    }
  } else {
    searching++;
    if (searching > 5) {
      searching = 0;
      const unstuck = await click("unstuck");
      if (unstuck) {
        mainThread();
      }
    } else {
      if (buffCounter > 35) {
        buffCounter = 0;
        manaMainCharacter();
      } else {
        const wasMoved = await click("move");
        if (wasMoved) {
          mainThread();
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
