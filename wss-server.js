const uuid = require('uuid/v4');
const server = require('http').createServer();
const io = require('socket.io')(server);

const sessions = {};

io.on('connection', (socket) => {
  socket.on('newSession', (respond) => {
    const sessionId = uuid();
    console.log('[%s] new session', sessionId);
    respond(sessionId);
  });

  socket.on('attachSession', (sessionId, respond) => {
    if (!sessions[sessionId]) {
      console.error('[%s] invalid session', sessionId);
      respond('no such session');
      return;
    }
    console.log('[%s] client attach to session', sessionId);
    respond();
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket server running...');
});
