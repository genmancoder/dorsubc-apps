// server.js
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => handle(req, res));

  const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
    
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log('Received =:', message);

      let data;
      try {
        data = JSON.parse(message);
        console.log('Parsed data:', data);
      } catch {
        console.log('Failed to parse message as JSON');
        console.warn('Invalid message format');
        return;
      }

      if (data.type === 'CALL_TICKET' && data.ticketNumber != null) {
        // Broadcast to all clients
        console.log('Broadcasting CALL_TICKET for ticket number:', data.ticketNumber);
        wss.clients.forEach((client) => {
          if (client.readyState === 1) { // WebSocket.OPEN = 1
            try {
              client.send(JSON.stringify({
                type: 'CALL_TICKET',
                ticketNumber: data.ticketNumber,
                windowId: data.windowId || null
              }));
            } catch (error) {
              console.error('Error sending message to client:', error);
            }
          }
        });
      } else if (data.type === 'QUEUE_UPDATE') {
        // Broadcast queue updates to all clients
        console.log('Broadcasting QUEUE_UPDATE for window:', data.windowId);
        wss.clients.forEach((client) => {
          if (client.readyState === 1) { // WebSocket.OPEN = 1
            try {
              client.send(JSON.stringify({
                type: 'QUEUE_UPDATE',
                windowId: data.windowId,
                action: data.action // 'next', 'complete', 'new', etc.
              }));
            } catch (error) {
              console.error('Error sending QUEUE_UPDATE to client:', error);
            }
          }
        });
      } else {
        console.log('Unknown message type or missing required fields', data);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    ws.on('close', () => console.log('Client disconnected'));
  });

  const PORT = process.env.PORT || 3005;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
