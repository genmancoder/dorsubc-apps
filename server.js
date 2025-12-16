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

      if (data.type === 'CALL_TICKET' && data.current.ticketNumber != null) {
        // Broadcast to all clients
        console.log('Broadcasting CALL_TICKET for ticket number:', data.current.ticketNumber);
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            console.log('Sending CALL_TICKET to client');
            client.send(JSON.stringify({
              type: 'CALL_TICKET',
              ticketNumber: data.current.ticketNumber
            }));
            console.log('Broadcasted CALL_TICKET for ticket number:', data.current.ticketNumber);
          }else{
            console.log('Client not ready, skipping');
          }
        });
      }else{
        console.log('Unknown message type or missing ticketNumber', data);
        console.log("ticket #", data.ticketNumber)
        console.log("type", data.type)
      }
    });

    ws.on('close', () => console.log('Client disconnected'));
  });

  const PORT = process.env.PORT || 3005;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
