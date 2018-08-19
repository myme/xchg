export default class SessionManager {
  sessions = {}

  async newSession() {
    const ws = new WebSocket('ws://localhost:8080');

    const id = await new Promise(resolve => {
      ws.onmessage = (message) => {
        const { sessionId } = JSON.parse(message.data);
        resolve(sessionId);
      };
    })

    this.sessions[id] = { ws };
    return id;
  }

  async destroySession(sessionId) {
    const session = this.sessions[sessionId];

    delete this.sessions[sessionId];
    if (!session) {
      return;
    }

    const { ws } = session;
    ws.close();

    await new Promise(resolve => { ws.onclose = resolve; });
  }
}
