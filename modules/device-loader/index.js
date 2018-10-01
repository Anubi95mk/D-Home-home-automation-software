const path = require('path');
const fs = require('fs');
const devices_modules_folder = path.join(__dirname,"../../","devices_modules");
var toExport = {};
toExport.list = [];



fs.readdirSync(devices_modules_folder).forEach(file => {
 
    toExport.list.push(require(path.join(devices_modules_folder,  file)));
   // console.log(file , "module loaded");
  })
   


module.exports = toExport;