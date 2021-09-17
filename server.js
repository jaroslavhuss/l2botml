/**
 * IMPORTS
 */
const L2Window = require("./modules/getL2WindowPosition");
const screenShot = require("./modules/makeScreenshot");
const move = require("./modules/mouseapi");
const click = require("./modules/portCommunication");
const hpcp = require("./modules/HPMPChecker");
const buffer = require("./modules/bufferController");
const axios = require("axios");
/**
 * C   O   N   F   I   G
 * =========================================
 * THE MOST IMPORTANT BLOCK OF THE CODE FUCKING FILIP!
 */
const WSL2_SERVER_URL = "172.28.226.14"; //When WSL2 started, the program will tell you the URL
const NAME_OF_CHARACTER = "Zasrana"; // Look at L2 window
const NAME_OF_BUFFER_CHARACTER = "Proper";
const PATH_TO_THE_WSL2 =
  "//wsl$/Ubuntu-20.04/home/jaroslavhuss/l2ubuntu/current.jpg"; //__DIR to WSL2
const HP_COORDS = {
  x: 140,
  y: 75,
};
const MP_POSITION = {
  x: 140,
  y: 87,
};
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
  const { left, top, right, bottom } = await L2Window(NAME_OF_CHARACTER);
  const data = await screenShot(left, top, right, bottom, PATH_TO_THE_WSL2);
  if (data) {
    try {
      const { data } = await axios.post("http://" + WSL2_SERVER_URL + ":5432/");
      if (data.length > 0) {
        const { w, h, x, y } = data[0].box;

        const wasMoved = await move(w, h, x, y);
        if (wasMoved) {
          const wasClicked = await click("click");
          if (wasClicked) {
            const status = await hpcp(HP_COORDS, MP_POSITION);
            console.log(status);
            searching = 0;
            if (status.mp) {
              mainThread();
            } else {
              manaMainCharacter();
            }
          }
        }
      } else {
        console.log("Looking arround...", searching);
        searching++;
        //Logic behind follow
        if (followCounter > 50) {
          followCounter = 0;
          followMainCharacterLogic();
        } else {
          const wasMoved = await click("move");
          if (wasMoved) {
            mainThread();
          }
        }

        if (buffCounter > 350) {
          buffMainCharacter = 0;
          buffMainCharacter();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("Ukončuji program!");
  }
};
const followMainCharacterLogic = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("follow");
  setTimeout(() => {
    mainThread();
  }, 4000);
};
const healMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("heal");
  setTimeout(() => {
    mainThread();
  }, 4000);
};
const buffMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("buff");
  setTimeout(() => {
    mainThread();
  }, 4000);
};
const manaMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("mana");
  setTimeout(() => {
    mainThread();
  }, 4000);
};
const main = async () => {
  followMainCharacterLogic();
  setTimeout(() => {
    mainThread();
  }, 3000);
};
main();
