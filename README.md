# ciscoparse #

This module will parse the output from Cisco's `show version` command. There
is a web front-end to this module as well, and it can be found
[here](http://github.com/scottdware/node-ciscoparse).

## Installation  ##

    npm install ciscoparse

## Usage ##

Information that can be parsed:

- Device Type (IOS or NX-OS/Nexus)
- Software Version
- Uptime
- Last boot reason
- Memory
- Model
- Serial number(s)
- Hardware (interfaces, modules, etc.)

For example, let's say that you have the `show version` output from a device
saved in a file called `show-version.txt`:

```javascript
var CiscoParse = require('ciscoparse');
var fs = require('fs');

fs.readFile('show-version.txt', function(err, data) {
  var parser = CiscoParse(data);

  console.log('Device Type: ' + parser.type());
  console.log('Version: ' + parser.version());
  console.log('Uptime: ' + parser.uptime());
  console.log('Boot Reason: ' + parser.bootReason());
  console.log('Memory: ' + parser.memory());
  console.log('Model: ' + parser.model());
  console.log('Serial: ' + parser.serial());
  console.log('Hardware: ' + parser.hardware());
});
```

For the `serial()` method, if there is more than one switch (i.e. a 3750 switch
stack), the serial numbers are stored in an array, and when printed to the console,
are displayed one right after the other:

```javascript
console.log('Serials: ' + parser.serial());
```

Would print out the following:

    Serials: CAT0000000A,CAT0000000B,CAT0000000C

The same thing applies to the `hardware()` method.
