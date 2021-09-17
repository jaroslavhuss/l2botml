const arduino = require("./portCommunication");
//This gets position of a Lineage 2 window
//https://github.com/nosolosoftware/win-control#class-window

const bufferController = (command) => {
  return new Promise(async (res) => {
    switch (command) {
      case "buff":
        console.log("Pressing F1 for buff macro");
        await arduino("buff");

        break;
      case "heal":
        console.log("Pressing F2 for healing macro");
        await arduino("heal");

        break;
      case "mana":
        console.log("Pressing F3 for mana macro");
        await arduino("mana");

        break;
      case "follow":
        console.log("Pressing F4 for following macro");
        await arduino("flw");

        break;
      default:
        break;
    }
    res(true);
  });
};

module.exports = bufferController;
