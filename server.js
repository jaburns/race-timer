'use strict'

var PORT = 1337;

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
app.listen(PORT);

function handler (req, res) {
  res.writeHead (404);
  return res.end ('404');
}

io.sockets.on('connection', function( socket ) {
  console.log ('New connection');
  socket.on('message', function( data ) {
    console.log ('MESSAGE RECEIVED: '+data);
  });
  setInterval (function () {
    socket.emit ('message', 'from server');
  },200);
});
