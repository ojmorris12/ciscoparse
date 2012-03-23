var CiscoParse = function (data) {
  this.data = data;
}

module.exports = CiscoParse;

// Returns the device type: IOS or NX-OS.
CiscoParse.prototype.type = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^Cisco.*(Nexus|IOS|Internetwork Operating System).*$/;
    var match = re.exec(line);

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

  if (result) {
    return result.trim();
  } else {
    return null;
  }
}

// Returns the IOS version.
CiscoParse.prototype.version = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^.*Version ([\d\.]+\([A-Za-z\d]+\)[A-Za-z\d]*)\,.*$/i;
    var nxRe = /^.*System version: (.*)$/i;
    var match = re.exec(line);
    var nxMatch = nxRe.exec(line);

    if (match) {
      result = match[1];
    } else if (nxMatch) {
      result = nxMatch[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return null;
  }
}

// Returns how long the device has been up.
CiscoParse.prototype.uptime = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^.*uptime.*is (.*)$/i;
    var match = re.exec(line);

    if (match) {
      result = match[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return null;
  }
}

// Returns the last reload/reboot reason.
CiscoParse.prototype.bootReason = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^.*(returned to ROM|restarted) by (.*)$/i;
    var nxRe = /^.*Reason: (.*)$/i;
    var match = re.exec(line);
    var nxMatch = nxRe.exec(line);

    if (match) {
      result = match[2];
    } else if (nxMatch) {
      result = nxMatch[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return null;
  }
}

// Returns the amount of memory installed on the device.
CiscoParse.prototype.memory = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^.*with (.*) (bytes|kb).*$/i;
    var match = re.exec(line);

    if (match) {
      result = match[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return null;
  }
}

// Returns the device model type.
CiscoParse.prototype.model = function () {
  var result;

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re = /^[Cc]isco ([-A-Z\d\/]+) .*bytes.*$/i;
    var nxRe = /^.*[Cc]isco (Nexus[\d]+).*$/i;
    var match = re.exec(line);
    var nxMatch = nxRe.exec(line);

    if (match) {
      result = match[1];
    } else if (nxMatch) {
      result = nxMatch[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return null;
  }
}

// Returns the serial number(s).
CiscoParse.prototype.serial = function () {
  var result = [];

  this.data.toString().split(/\r?\n/).forEach(function (line) {
    var re1 = /.*Processor board ID ([A-Za-z\d]+)$/i;
    var re2 = /.*System serial number.* ([A-Za-z\d]+)$/i;
    var match1 = re1.exec(line);
    var match2 = re2.exec(line);

    if (match1) {
      result.push(match1[1]);
    }

    if (match2) {
      result.push(match2[1]);
    }
  });

  if (result.length > 1) {
    return result.splice(1);
  } else {
    return result;
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

  return result;
}
