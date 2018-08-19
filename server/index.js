const uuid = require('uuid/v4');
const server = require('http').createServer();
const io = require('socket.io')(server);
const logger = require('loglevel');
logger.setLevel('info');

const sessions = {};

io.on('connection', (socket) => {
  let sessionId;

  function log(level, ...args) {
    // eslint-disable-next-line no-console
    logger[level](`[${sessionId || 'unknown'}]`, ...args);
  }

  const info = log.bind(null, 'info');
  const error = log.bind(null, 'error');

  socket.on('newSession', (respond) => {
    sessionId = uuid();
    socket.join(sessionId);
    info('new session');
    sessions[sessionId] = { clients: [socket] };
    respond(sessionId);
  });

  socket.on('attachSession', (requestId, respond) => {
    if (!sessions[requestId]) {
      error(`invalid session: ${requestId}`);
      respond('no such session');
      return;
    }
    sessionId = requestId;
    socket.join(sessionId);
    sessions[sessionId].clients.push(socket);
    info('client attached to session');
    respond();
  });

  socket.on('xchg', (args, respond) => {
    info('xchg', sessionId, args);
    io.sockets.to(sessionId).emit('xchg', args);
    respond();
  });

  socket.on('disconnect', () => {
    info('disconnected');
    if (sessionId && sessions[sessionId]) {
      const clients = sessions[sessionId].clients.filter(c => c !== socket);
      sessions[sessionId].clients = clients;
      if (!clients.length) {
        info('session terminated');
        delete sessions[sessionId];
      }
    }
  });
});

server.listen(8080, () => {
  // eslint-disable-next-line no-console
  logger.log('WebSocket server running...');
});
