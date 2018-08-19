import io from 'socket.io-client';
import * as log from 'loglevel';

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
      socket
        .on('connect', () => resolve(socket))
        // TODO: Output to GUI element
        .on('xchg', (...args) => { log.warn(args); })
        .on('error', reject);
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

    await new Promise((resolve, reject) => {
      socket.emit('attachSession', sessionId, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
    
    this.sessions[sessionId] = { socket };
  }

  async destroySession(sessionId) {
    const session = this.sessions[sessionId];

    delete this.sessions[sessionId];
    if (!session) {
      return;
    }

    await new Promise((resolve) => {
      const { socket } = session;
      socket.once('disconnect', resolve);
      socket.close();
    });
  }

  async xchg(sessionId, args) {
    return new Promise(resolve => {
      if (!this.sessions[sessionId]) {
        log.error(`invalid session: ${sessionId}`);
        return;
      }
      const { socket } = this.sessions[sessionId];
      socket.emit('xchg', args, resolve);
    });
  }
}
