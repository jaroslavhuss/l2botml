const {getMousePos} = require("robotjs");
setInterval(() => {
   console.log(getMousePos());
},100)