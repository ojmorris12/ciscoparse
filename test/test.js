var CiscoParse = require('../ciscoparse.js');
var fs = require('fs');

fs.readFile(__dirname + '/ios.txt', function (err, data) {
  var parser = new CiscoParse(data);
  console.log('Device Type: ' + parser.type());
  console.log('Version: ' + parser.version());
  console.log('Uptime: ' + parser.uptime());
  console.log('Boot Reason: ' + parser.bootReason());
  console.log('Memory: ' + parser.memory());
  console.log('Model: ' + parser.model());
  console.log('Serial: ' + parser.serial());
  console.log('Hardware: ' + parser.hardware());
  console.log('\n');
});

fs.readFile(__dirname + '/n5k.txt', function (err, data) {
  var parser = new CiscoParse(data);
  console.log('Device Type: ' + parser.type());
  console.log('Version: ' + parser.version());
  console.log('Uptime: ' + parser.uptime());
  console.log('Boot Reason: ' + parser.bootReason());
  console.log('Memory: ' + parser.memory());
  console.log('Model: ' + parser.model());
  console.log('Serial: ' + parser.serial());
  console.log('Hardware: ' + parser.hardware());
  console.log('\n');
});

fs.readFile(__dirname + '/n7k.txt', function (err, data) {
  var parser = new CiscoParse(data);
  console.log('Device Type: ' + parser.type());
  console.log('Version: ' + parser.version());
  console.log('Uptime: ' + parser.uptime());
  console.log('Boot Reason: ' + parser.bootReason());
  console.log('Memory: ' + parser.memory());
  console.log('Model: ' + parser.model());
  console.log('Serial: ' + parser.serial());
  console.log('Hardware: ' + parser.hardware());
});
