const websocketsEvents = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinChannel', (mess) => {
      io.emit('joinChannel', mess);
    });
    socket.on('leaveChannel', (mess) => {
      io.emit('leaveChannel', mess);
    });
    socket.on('message', (mess) => {
      io.emit('newMessage', mess);
    });
    socket.on('end', () => {
      socket.disconnect(0);
    });
    socket.on('newChannel', (mess) => {
      io.emit('channel', mess);
    });
    socket.on('newDeleteChannel', (mess) => {
      io.emit('deleteChannel', mess);
    });
    socket.on('disconnectFromChannel', (mess) => {
      io.emit('newDisconnectFromChannel', mess);
    });
  });
};

module.exports = websocketsEvents;
