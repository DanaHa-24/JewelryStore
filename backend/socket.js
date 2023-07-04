const socketIO = require('socket.io');

let io;

const init = (server) => {
  io = socketIO(server);

  console.log('socket.io initialized');

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (data) => {
      console.log('Received message:', data);
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = {
  init,
  getIO,
};
