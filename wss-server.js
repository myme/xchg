const uuid = require('uuid/v4');
const server = require('http').createServer();
const io = require('socket.io')(server);
const logger = require('loglevel');

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
    sessions[sessionId].clients.push(socket);
    info('client attach to session');
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
