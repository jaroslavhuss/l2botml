var processWindows = require("node-process-windows");
const { Window } = require('win-control')
//This gets position of a Lineage 2 window
//https://github.com/nosolosoftware/win-control#class-window

 const getL2Position = (name) => {
     return new Promise((res, rej) => {
        processWindows.getProcesses(function (err, processes) {
            if(err){
                console.log("ERROR!!!")
                console.log(err)
            }else{
             processes.forEach(function (p) {
                 if (p.mainWindowTitle.match(name)) {
                       const PID = p.pid;
                   Window.getByPid(PID).setForeground();
                     res(Window.getByPid(PID).getDimensions())
                 }
             });
            }
          
         });
        
     })
 }

 module.exports = getL2Position;