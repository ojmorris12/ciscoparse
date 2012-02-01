# ciscoparse #

This module will parse the output from Cisco's `show version` command.

## Installation  ##

    npm install ciscoparse

## Usage ##

Information that will be parsed:

- IOS Version
- Uptime
- Last boot reason
- Memory
- Model
- Serial number(s)
- Hardware (interfaces, modules, etc.)

For example, let's say that you have the `show version` output from a device
saved in a file called `show-version.txt`:

    var CiscoParse = require('ciscoparse');
    var fs = require('fs');

    fs.readFile('show-version.txt', function(err, data) {
      var parser = new CiscoParse(data);

      console.log('IOS: ' + parser.version());
      console.log('Uptime: ' + parser.uptime());
      console.log('Boot Reason: ' + parser.bootReason());
      console.log('Memory: ' + parser.memory());
      console.log('Model: ' + parser.model());
      console.log('Serial: ' + parser.serial());
      console.log('Hardware: ' + parser.hardware());
    });

For the `serial()` method, if there is more than one switch (i.e. a 3750 switch
stack), the serial numbers are stored in an array, and when printed to the console,
are displayed one right after the other:

    console.log('Serials: ' + parser.serial());

Would print out the following:

    Serials: CAT0000000A,CAT0000000B,CAT0000000C

The same thing applies to the `hardware()` method.

## Issues ##

- This currently will **NOT** work with any Nexus (NX-OS) devices.

## License ##

The MIT License (MIT)

Copyright (c) 2011 Scott Ware <scottdware@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
