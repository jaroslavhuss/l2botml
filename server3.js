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
  //Načtu okno
  L2Window(NAME_OF_CHARACTER).then(({ left, top, right, bottom }) => {
    console.log("1. Načetl jsem okno a dostal koords");
    //Udělám screenshot
    screenShot(left, top, right, bottom, UBUNTU_SERVER_URL).then(({ data }) => {
      console.log("2. udělal jsem screenshot a poslal to do Folda");
      if (data.length > 0) {
        const { w, h, x, y } = data[0].box;
        move(w, h, x, y).then(() => {
          console.log("3. Pohnul jsem myší");
          click("click").then(() => {
            console.log("4. A kliknul arduinem. - opakuji cyklus");
            searching = 0;
            setTimeout(() => {
              mainThread();
            });
          });
        });
      } else {
        searching++;
        if (searching > 5) {
          searching = 0;
          click("unstuck").then(() => {
            console.log("3. Hledám moby a opakuji cyklus");
            mainThread();
          });
        } else {
          if (buffCounter > 35) {
            buffCounter = 0;
            console.log("3. Dávám manu hlavnímu charu");
            manaMainCharacter();
          } else {
            click("move").then(() => {
              console.log(
                "3. klikám na levou šipku a rozhlížím se - opakuji cyklus"
              );
              mainThread();
            });
          }
        }
      }
    });
  });
};
const followMainCharacterLogic = async () => {
  L2Window(NAME_OF_BUFFER_CHARACTER).then(() => {
    buffer("follow").then(() => {
      setTimeout(() => {
        mainThread();
      }, 2000);
    });
  });
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
  L2Window(NAME_OF_BUFFER_CHARACTER).then(() => {
    buffer("mana").then(() => {
      setTimeout(() => {
        mainThread();
      }, 2000);
    });
  });
};
const main = async () => {
  followMainCharacterLogic();
};
main();
