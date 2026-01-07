// Utility to broadcast WebSocket messages from API routes
// Server-side WebSocket client for API routes to broadcast updates

import WebSocket from 'ws';

let wsClient: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const BASE_DELAY = 1000;

function getWebSocketUrl(): string {
  // For server-side, use localhost or internal network
  return process.env.WS_URL || 'ws://localhost:3005';
}

function connect() {
  if (wsClient?.readyState === WebSocket.OPEN) {
    return;
  }

  try {
    const wsUrl = getWebSocketUrl();
    wsClient = new WebSocket(wsUrl);

    wsClient.on('open', () => {
      console.log('[API WebSocket Client] Connected to server');
      reconnectAttempts = 0;
    });

    wsClient.on('error', (error) => {
      console.error('[API WebSocket Client] Error:', error.message);
    });

    wsClient.on('close', () => {
      console.log('[API WebSocket Client] Disconnected');
      wsClient = null;

      // Attempt to reconnect
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        const delay = Math.min(BASE_DELAY * Math.pow(2, reconnectAttempts), 30000);
        reconnectAttempts++;
        
        reconnectTimeout = setTimeout(() => {
          connect();
        }, delay);
      }
    });
  } catch (error) {
    console.error('[API WebSocket Client] Error creating connection:', error);
  }
}

// Initialize connection on module load
if (typeof window === 'undefined') {
  // Only connect on server-side
  connect();
}

export function broadcastQueueUpdate(windowId: number, action: string) {
  if (!wsClient || wsClient.readyState !== WebSocket.OPEN) {
    console.warn('[API WebSocket Client] Not connected, attempting to reconnect...');
    connect();
    return;
  }

  try {
    wsClient.send(JSON.stringify({
      type: 'QUEUE_UPDATE',
      windowId,
      action,
    }));
    console.log(`[API WebSocket Client] Broadcasted QUEUE_UPDATE for window ${windowId}, action: ${action}`);
  } catch (error) {
    console.error('[API WebSocket Client] Error broadcasting queue update:', error);
  }
}

export function broadcastTicketCall(ticketNumber: number, windowId: number) {
  if (!wsClient || wsClient.readyState !== WebSocket.OPEN) {
    console.warn('[API WebSocket Client] Not connected, attempting to reconnect...');
    connect();
    return;
  }

  try {
    wsClient.send(JSON.stringify({
      type: 'CALL_TICKET',
      ticketNumber,
      windowId,
    }));
    console.log(`[API WebSocket Client] Broadcasted CALL_TICKET: ${ticketNumber} for window ${windowId}`);
  } catch (error) {
    console.error('[API WebSocket Client] Error broadcasting ticket call:', error);
  }
}

export function closeWebSocketClient() {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
  }
  if (wsClient) {
    wsClient.close();
    wsClient = null;
  }
}

