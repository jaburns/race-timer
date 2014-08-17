'use strict';

var SERVER = 'http://jaburns.net:1234';

if (process.argv.length < 3) {
  console.log ('Must supply argument: ls, start, or finish');
  process.exit ();
}

var mode = process.argv[2];

if (mode === 'ls') {
  require('serialport').list (function (err, ports) {
    ports.forEach (function(port) {
      console.log (port.comName);
    });
  });
}
else {
  if (mode !== 'start' && mode !== 'finish') {
    console.log ('First argument must be "start" or "finish"');
    process.exit ();
  }

  if (process.argv.length < 4) {
    console.log ('Start or finish line mode requires serial port');
    process.exit ();
  }

  var portName = process.argv[3];

  var serialport = require('serialport');
  var socket = require('socket.io-client')(SERVER);

  var sp = new serialport.SerialPort (portName, {
    parser: serialport.parsers.readline('\n'),
    baudrate: 112500
  });

  socket.on('connect', function() {
    console.log ('Connected to relay server.');
    socket.on('message', function(data){
      console.log ('Server says: '+data);
    });
    sp.on ('data', function(data) {
      socket.send ('hit');
    });
  });
}
