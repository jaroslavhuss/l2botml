const { getPixelColor } = require("robotjs");
const arrayOfHPColors = [
  "a22c1f",
  "a23428",
  "35261f",
  "34251d",
  "34241c",
  "33241b",
  "942518",
  "892015",
  "791c11",
  "781c11",
  "7e342c",
  "932518",
  "824d46",
  "825750",
  "8e605c",
  "7f3e38",
  "7d342c",
  "7d352c",
  "32241a",
  "3b3b31",
  "3d3c32",
  "32231a",
  "332319",
];

const arrayOfMPColors = [
  "064f97",
  "0951a8",
  "0946a1",
  "074092",
  "053986",
  "305589",
  "405d8b",
  "567096",
  "234b88",
  "234c89",
  "0952a8",
];
//HP and MP coords - destructured
const getHPMP = async (HP, MP) => {
  return new Promise((res) => {
    const promiseObject = {
      hp: true,
      mp: true,
    };
    const HP_status = arrayOfHPColors.indexOf(getPixelColor(HP.x, HP.y));
    const MP_status = arrayOfMPColors.indexOf(getPixelColor(MP.x, MP.y));
    console.log("Pozice MP: ", MP_status);
    if (HP_status > -1) {
      promiseObject.hp = true;
    } else {
      promiseObject.hp = false;
    }
    if (MP_status > -1) {
      promiseObject.mp = true;
    } else {
      promiseObject.mp = false;
    }
    res(promiseObject);
  });
};
module.exports = getHPMP;
