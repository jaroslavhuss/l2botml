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
  console.log("1. Načetl jsem okno hlavního charu");

  const { data } = await screenShot(
    left,
    top,
    right,
    bottom,
    UBUNTU_SERVER_URL
  );
  console.log(data);
  console.log("2. Udělal jsem screenshot a získal data z telefonu");
  if (data.length > 0) {
    const { w, h, x, y } = data[0].box;
    await move(w, h, x, y);
    console.log("3. Pohybuji myší k mobovi");
    const wasClicked = await click("click");
    console.log("4. Klikám na moba");
    if (wasClicked) {
      searching = 0;
      console.log("5. Obnovuji cyklus");
      mainThread();
    }
  } else {
    searching++;
    if (searching > 5) {
      searching = 0;
      const unstuck = await click("unstuck");
      console.log("3. mačkám macro, abych našel moba - jsem zaseklý");
      if (unstuck) {
        console.log("4. obnovuji cyklus");
        mainThread();
      }
    } else {
      if (buffCounter > 65) {
        buffCounter = 0;
        console.log("3. Doplňuji manu mainu");
        manaMainCharacter();
      } else {
        const wasMoved = await click("move");
        console.log("3. klikl jsem doleva, abych se rozhlédl");
        if (wasMoved) {
          console.log("Obnovuji cyklus");
          mainThread();
        }
      }
    }
  }
};
const followMainCharacterLogic = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("follow");
  setTimeout(async () => {
    mainThread();
  }, 2000);
};
const healMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("heal");
  setTimeout(async () => {
    mainThread();
  }, 2000);
};
const buffMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  await buffer("buff");
  setTimeout(async () => {
    mainThread();
  }, 2000);
};
const manaMainCharacter = async () => {
  await L2Window(NAME_OF_BUFFER_CHARACTER);
  console.log("4. Načetl jsem buffera");
  await buffer("mana");
  console.log("5. Dal jsem mu manu");
  setTimeout(async () => {
    console.log("6. obnovuji cyklus");
    mainThread();
  }, 2000);
};
const main = async () => {
  followMainCharacterLogic();
  setTimeout(async () => {
    mainThread();
  }, 2000);
};
main();
