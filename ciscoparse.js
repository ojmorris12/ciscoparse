var CiscoParse = function(data) {
  this.data = data;
};

// Returns the IOS version.
CiscoParse.prototype.version = function() {
  var result;
  var data = this.data;

  data.toString().split(/\r?\n/).forEach(function(line) {
    var re = /^.*Version ([\d\.]+\([A-Za-z\d]+\)[A-Za-z\d]*)\,.*$/;
    var match = re.exec(line);

    if (match) {
      result = match[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return 'N/A';
  }
};

// Returns how long the device has been up.
CiscoParse.prototype.uptime = function() {
  var result;
  var data = this.data;

  data.toString().split(/\r?\n/).forEach(function(line) {
    var re = /^.*uptime.*is (.*)$/;
    var match = re.exec(line);

    if (match) {
      result = match[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return 'N/A';
  }
};

// Returns the last reload/reboot reason.
CiscoParse.prototype.bootReason = function() {
  var result;
  var data = this.data;

  data.toString().split(/\r?\n/).forEach(function(line) {
    var re = /^.*(returned to ROM|restarted) by (.*)$/;
    var match = re.exec(line);

    if (match) {
      result = match[2];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return 'N/A';
  }
};

// Returns the amount of memory installed on the device.
CiscoParse.prototype.memory = function() {
  var result;
  var data = this.data;

  data.toString().split(/\r?\n/).forEach(function(line) {
    var re = /^.*with (.*) bytes.*$/;
    var match = re.exec(line);

    if (match) {
      result = match[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return 'N/A';
  }
};

// Returns the device model type.
CiscoParse.prototype.model = function() {
  var result;
  var data = this.data;

  data.toString().split(/\r?\n/).forEach(function(line) {
    var re = /^[Cc]isco ([-A-Z\d\/]+) .*bytes.*$/;
    var match = re.exec(line);

    if (match) {
      result = match[1];
    }
  });

  if (result) {
    return result.trim();
  } else {
    return 'N/A';
  }
};

// Returns the serial number(s).
CiscoParse.prototype.serial = function() {
  var result = [];
  var data = this.data;

  data.toString().split(/\r?\n/).forEach(function(line) {
    var re1 = /.*Processor board ID ([A-Za-z\d]+)$/;
    var re2 = /.*System serial number.* ([A-Za-z\d]+)$/;
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
};

// Returns a list of hardware installed, such as interfaces, etc.
CiscoParse.prototype.hardware = function() {
  var result = [];
  var data = this.data;

  data.toString().split(/\r?\n/).forEach(function(line) {
    var re = /^([\d]+\s+.*)$/;
    var match = re.exec(line);

    if (match) {
      result.push(match[1]);
    }
  });

  return result;
};

module.exports = CiscoParse;
