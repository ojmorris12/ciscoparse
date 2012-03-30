var CiscoParse = function (data) {
  if (!(this instanceof CiscoParse)) {
    return new CiscoParse(data);
  }

  this.data = data;
};

module.exports = CiscoParse;

// Returns the device type: IOS or NX-OS.
CiscoParse.prototype.type = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^Cisco.*(Nexus|IOS|Internetwork Operating System).*$/,
        match = re.exec(line);

    if (match && match[1] === 'Nexus') {
      result = 'NX-OS (Nexus)';
    }

    if (match && match[1] === 'IOS') {
      result = match[1];
    }

    if (match && match[1] === 'Internetwork Operating System') {
      result = 'IOS';
    }
  });

  return result ? result.trim() : null;
}

// Returns the IOS version.
CiscoParse.prototype.version = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^.*Version ([\d\.]+\([A-Za-z\d]+\)[A-Za-z\d]*)\,.*$/i,
        nxRe = /^.*System version: (.*)$/i,
        match = re.exec(line),
        nxMatch = nxRe.exec(line);

    if (match) {
      result = match[1];
    } else if (nxMatch) {
      result = nxMatch[1];
    }
  });

  return result ? result.trim() : null;
}

// Returns how long the device has been up.
CiscoParse.prototype.uptime = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^.*uptime.*is (.*)$/i,
        match = re.exec(line);

    if (match) {
      result = match[1];
    }
  });

  return result ? result.trim() : null;
}

// Returns the last reload/reboot reason.
CiscoParse.prototype.bootReason = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^.*(returned to ROM|restarted) by (.*)$/i,
        nxRe = /^.*Reason: (.*)$/i,
        match = re.exec(line),
        nxMatch = nxRe.exec(line);

    if (match) {
      result = match[2];
    } else if (nxMatch) {
      result = nxMatch[1];
    }
  });

  return result ? result.trim() : null;
}

// Returns the amount of memory installed on the device.
CiscoParse.prototype.memory = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^.*with (.*) (bytes|kb).*$/i,
        match = re.exec(line);

    if (match) {
      result = match[1];
    }
  });

  return result ? result.trim() : null;
}

// Returns the device model type.
CiscoParse.prototype.model = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^[Cc]isco ([-A-Z\d\/]+) .*bytes.*$/i,
        nxRe = /^.*[Cc]isco (Nexus[\d]+).*$/i,
        match = re.exec(line),
        nxMatch = nxRe.exec(line);

    if (match) {
      result = match[1];
    } else if (nxMatch) {
      result = nxMatch[1];
    }
  });

  return result ? result.trim() : null;
}

// Returns the serial number(s).
CiscoParse.prototype.serial = function () {
  var result = [];

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var procRe = /.*Processor board ID ([A-Za-z\d]+)$/i,
        sysRe = /.*System serial number.* ([A-Za-z\d]+)$/i,
        procMatch = procRe.exec(line),
        sysMatch = sysRe.exec(line);

    if (procMatch) {
      result.push(procMatch[1]);
    }

    if (sysMatch) {
      result.push(sysMatch[1]);
    }
  });

  if (result.length > 1) {
    return result.splice(1);
  } else {
    return result ? result : null;
  }
}

// Returns a list of hardware installed, such as interfaces, etc.
CiscoParse.prototype.hardware = function () {
  var result = [];

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^([\d]{1,3}\s+.*)$/i;
    var match = re.exec(line);

    if (match) {
      result.push(match[1]);
    }
  });

  return result ? result : null;
}
