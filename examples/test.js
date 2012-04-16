var ciscoparse = require('../index.js');
var fs = require('fs');
var data = fs.readFileSync(__dirname + '/ios.txt', 'utf-8');
var parser = ciscoparse.parse(data);

console.log('Device Type: ' + parser.type());
console.log('Version: ' + parser.version());
console.log('Uptime: ' + parser.uptime());
console.log('Boot Reason: ' + parser.bootReason());
console.log('Memory: ' + parser.memory());
console.log('Model: ' + parser.model());
console.log('Serial: ' + parser.serial());
console.log('Hardware: ' + parser.hardware());
