const uuid = require('uuid/v4');
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('newSession', (respond) => {
    const sessionId = uuid();
    console.log('[%s] new session', sessionId);
    respond(sessionId);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket server running...');
});
