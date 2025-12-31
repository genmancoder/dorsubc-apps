// server.js
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3005;

// --------------------
// Express middleware
// --------------------
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Express + WebSocket server running 🚀');
});

// --------------------
// WebSocket logic
// --------------------
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    let data;
    try {
      data = JSON.parse(message);
    } catch (err) {
      console.warn('Invalid JSON');
      return;
    }

    console.log('Parsed data:', data);

    if (data.type === 'CALL_TICKET' && data.ticketNumber != null) {
      console.log('Broadcasting ticket:', data.ticketNumber);

      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({
              type: 'CALL_TICKET',
              ticketNumber: data.ticketNumber,
            })
          );
        }
      });
    } else {
      console.log('Unknown message:', data);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// --------------------
// Start server
// --------------------
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
