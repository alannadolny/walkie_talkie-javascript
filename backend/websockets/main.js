const websocketsEvents = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinChannel', (mess) => {
      io.emit('joinChannel', mess);
    });
    socket.on('leaveChannel', (mess) => {
      io.emit('leaveChannel', mess);
    });
  });
};

module.exports = websocketsEvents;
