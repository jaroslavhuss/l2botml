const {getPixelColor} = require("robotjs");
const arrayOfHPColors = [
    'a22c1f', 'a23428', '35261f',
    '34251d', '34241c', '33241b',
    '942518', '892015', '791c11',
    '781c11', '7e342c', '932518',
    '824d46', '825750', '8e605c',
    '7f3e38', '7d342c', '7d352c',
    '32241a', '3b3b31', '3d3c32',
    '32231a', '332319',
]

const arrayOfMPColors = [
    '064f97', '0951a8', '053986', '234b88',
    '234c89', '305589', '405d8b', '567096',
    '405e8b', '074092', '0946a1', '1a263a',
    '192538', '172236', '192539', '0952a8',
    '1f2a3a', '202a3b', '30558a', '1f2b3a',
    '4c6288', '182538', '1c2739', '39382b',
    '3d3d2d', '202a3a', '1e2a3c', '202b3d',
    '1e2a3d', '36362f', '31312b', '2e2e28',
]
//HP and MP coords - destructured
const getHPMP = async (HP,MP) => {
    return new Promise((res) => {
        const promiseObject = {
            hp:true,
            mp:true
        }
        const HP_status = arrayOfHPColors.indexOf(getPixelColor(HP.x,HP.y));
        const MP_status = arrayOfMPColors.indexOf(getPixelColor(MP.x,MP.y));
        console.log(getPixelColor(MP.x,MP.y));
        if(HP_status>-1){promiseObject.hp = true}else{promiseObject.hp = false}
        if(MP_status>-1){promiseObject.mp = true}else{promiseObject.mp = false}
        res(promiseObject);
    })
  
}
module.exports = getHPMP;