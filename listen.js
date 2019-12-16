const app = require('./server');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const { PORT = 9090 } = process.env;
// app.listen(PORT, () => console.log(`Listening on ${PORT}`));

io.on('connection', socket => {
  console.log('New Client Connected');
  console.log(PORT);
  socket.emit('hello', { msg: 'hello from the server' });
  socket.on('incoming', data => {
    console.log('here');
    console.log(data);
    socket.broadcast.emit('outgoing', { data });
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));
