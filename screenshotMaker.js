const L2Window = require ("./modules/getL2WindowPosition")
const screenShot = require("./modules/screenShotRunner");

let counter = 197;
const NAME_OF_CHARACTER = "Zasrana"
const screenShotMaker = async() => {
    const {left,top,right,bottom} = await L2Window(NAME_OF_CHARACTER)
    await screenShot(left,top, right, bottom, counter); 
    console.log("fotka číslo: ", counter)  
    counter++
    setTimeout(() => {
        screenShotMaker();
    }, 5000)
}
screenShotMaker();
