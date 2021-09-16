/**
 * IMPORTS
 */
const L2Window = require ("./modules/getL2WindowPosition")
const screenShot = require("./modules/makeScreenshot");
const move = require("./modules/mouseapi");
const click = require("./modules/portCommunication");
const hpcp = require("./modules/HPMPChecker")
const axios = require("axios")
/**
 * C   O   N   F   I   G
 * =========================================
 * THE MOST IMPORTANT BLOCK OF THE CODE FUCKING FILIP! 
 */
const WSL2_SERVER_URL = "172.28.226.14" //When WSL2 started, the program will tell you the URL
const NAME_OF_CHARACTER = "Zasrana"; // Look at L2 window
const NAME_OF_BUFFER_CHARACTER = "";
const PATH_TO_THE_WSL2 = '//wsl$/Ubuntu-20.04/home/jaroslavhuss/l2ubuntu/current.jpg' //__DIR to WSL2
const HP_COORDS = {
    x:162,
    y:75
};
const MP_POSITION = {
    x:140,
    y:87
}
/**
 * =========================================
 */
/**
 * Main Thread
 */
//Main thread core variables
let counter = 0;
let searching = 0;

const mainThread = async () => {
    counter++;
    const {left,top,right,bottom} = await L2Window(NAME_OF_CHARACTER)
        const data = await screenShot(left,top, right, bottom, PATH_TO_THE_WSL2);
        if(data){
            try {
             const {data} = await axios.post("http://"+WSL2_SERVER_URL+":5432/");
             if(data.length>0){
                
                 const {w,h,x,y} = data[0].box;  
                  await move(w,h,x,y)
                  await click("click");
               const status =  await hpcp(HP_COORDS, MP_POSITION)
               console.log(status)
                  searching = 0;
                 mainThread();
             }else{
                     console.log("Looking arround...", searching);
                     searching++;
                     await click("move");
                 mainThread();
             }
            } catch (error) {
                console.log(error.message)
            }
        }else{
         console.log("Ukončuji program!")
        }
   
 
}
const main = () => {
    mainThread();
}
main();