import uuidv4 from 'uuid/v4';

export default class SessionManager {
  sessions = {}

  newSession() {
    const sessionId = uuidv4();
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (message) => {
      console.log(message);
    };
    this.sessions[sessionId] = ws;
    return sessionId;
  }

  destroySession(sessionId) {
    const session = this.sessions[sessionId];
    delete this.sessions[sessionId];
    if (!session) {
      return;
    }
    session.close();
  }
}
