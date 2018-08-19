import io from 'socket.io-client';

export default class SessionManager {
  constructor(websocketServer) {
    this.websocketServer = websocketServer;
  }

  sessions = {}

  async connect() {
    return new Promise((resolve, reject) => {
      const socket = io(this.websocketServer, {
        transports: ['websocket'],
      });
      socket.on('connect', () => resolve(socket));
      socket.on('error', reject);
    });
  }

  async newSession() {
    const socket = await this.connect();

    const id = await new Promise((resolve) => {
      socket.emit('newSession', resolve);
    });

    this.sessions[id] = { socket };
    return id;
  }

  async connectToSession(sessionId) {
    if (this.sessions[sessionId]) {
      return;
    }

    const socket = await this.connect();

    await new Promise((resolve) => {
      socket.emit('attachSession', sessionId, resolve);
    });
  }

  async destroySession(sessionId) {
    const session = this.sessions[sessionId];

    delete this.sessions[sessionId];
    if (!session) {
      return;
    }

    const { socket } = session;
    socket.close();

    await new Promise((resolve) => { socket.once('disconnect', resolve); });
  }
}
