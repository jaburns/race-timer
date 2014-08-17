'use strict';

var serialport = require('serialport');
var socket = require('socket.io-client')('http://localhost:1337');

serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});

var sp = new serialport.SerialPort('COM12', {
  parser: serialport.parsers.readline('\n'),
  baudrate: 112500
});

socket.on('connect', function() {
  console.log ('Connected to relay server.');
  socket.on('message', function(data){
    console.log ('Server says: '+data);
  });
  sp.on ('data', function(data) {
    socket.emit ('message', 'hit');
  });
});
