var CiscoParse = require('../ciscoparse.js');
var fs = require('fs');

fs.readFile(__dirname + '/show-version.txt', function (err, data) {
  if (err) throw err;
  var parser = new CiscoParse(data);

  console.log('IOS: ' + parser.version());
  console.log('Uptime: ' + parser.uptime());
  console.log('Boot Reason: ' + parser.bootReason());
  console.log('Memory: ' + parser.memory());
  console.log('Model: ' + parser.model());
  console.log('Serial: ' + parser.serial());
  console.log('Hardware: ' + parser.hardware());
});
