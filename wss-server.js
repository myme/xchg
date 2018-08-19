const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  const sessionId = uuidv4();
  console.log('[%s] New session!', sessionId);

  ws.on('close', () => {
    console.log('[%s] Disconnect!', sessionId);
  });

  ws.on('message', (message) => {
    console.log('[%s] %s', sessionId, message);
  });

  ws.send(JSON.stringify({ sessionId }));
});
