# WebSocket Setup Guide

## Problem

WebSocket shows "Disconnected" and calling tickets fails with "Cannot call ticket: WebSocket disconnected"

## Solution

### Step 1: Create Environment File

Create a file named `.env.local` in the root directory with this content:

```env
# WebSocket Configuration for Development
NEXT_PUBLIC_WS_URL=ws://localhost:3005
WS_URL=ws://localhost:3005
```

**Note:** For network access from other devices, use your network IP:

```env
NEXT_PUBLIC_WS_URL=ws://10.10.115.21:3005
WS_URL=ws://10.10.115.21:3005
```

### Step 2: Run the WebSocket Server

The WebSocket server (`server.js`) must run **separately** from Next.js.

#### Option A: Using Two Terminals (Recommended for Development)

**Terminal 1 - Run WebSocket Server:**

```bash
npm run serv
```

You should see:

```
Server running on http://localhost:3005
```

**Terminal 2 - Run Next.js:**

```bash
npm run dev
```

#### Option B: Using one terminal with concurrently

Install concurrently:

```bash
npm install --save-dev concurrently
```

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "serv": "node server.js",
    "dev:all": "concurrently \"npm run serv\" \"npm run dev\"",
    "build": "next build --turbopack",
    "start": "next start"
  }
}
```

Then run:

```bash
npm run dev:all
```

### Step 3: Restart Next.js

After creating `.env.local`, **restart** your Next.js dev server for the environment variables to take effect:

1. Stop the dev server (Ctrl+C)
2. Run `npm run dev` again

### Step 4: Verify Connection

1. Open http://localhost:3000
2. Check the connection indicator (should show green dot and "Connected")
3. Navigate to http://localhost:3000/queue/7
4. The header should show "Live" with a green dot
5. Try clicking "Call" button - should work now!

## Troubleshooting

### Still showing "Disconnected"?

**Check 1: Is WebSocket server running?**

```bash
# You should see server.js running in one terminal
Server running on http://localhost:3005
Client connected  # When you open the browser
```

**Check 2: Is .env.local created?**

- File must be named exactly `.env.local` (not `.env` or `.env.development`)
- Must be in the project root directory
- Must contain `NEXT_PUBLIC_WS_URL=ws://localhost:3005`

**Check 3: Did you restart Next.js after creating .env.local?**

- Environment variables are loaded at startup
- Must restart the dev server after creating/modifying `.env.local`

**Check 4: Check browser console for errors**

- Open Developer Tools (F12)
- Look in Console tab for WebSocket errors
- Should see: "Display Area: WS connected" or "Queue Page: WS connected"

**Check 5: Port 3005 already in use?**

```bash
# On Windows, check if port 3005 is in use:
netstat -ano | findstr :3005

# Kill the process if needed:
taskkill /PID <process_id> /F
```

### Connection works but "Call" button still fails?

**Check:** Is the queue page using the persistent WebSocket connection?

- The error "Cannot call ticket: WebSocket disconnected" means the page-level WebSocket is not connected
- Check browser console for connection errors
- Verify the connection status indicator shows green/Live

### Network Access (Other Devices)

To access from other devices on your network:

1. Update `.env.local`:

```env
NEXT_PUBLIC_WS_URL=ws://YOUR_IP:3005
WS_URL=ws://localhost:3005
```

2. Find your IP address:

```bash
# Windows
ipconfig

# Look for IPv4 Address, e.g., 192.168.1.100 or 10.10.115.21
```

3. Update the WebSocket URL to use your IP
4. Restart both servers
5. Access from other devices: `http://YOUR_IP:3000`

## Quick Start Commands

```bash
# 1. Create .env.local file (copy from .env.example)
cp .env.example .env.local

# 2. Terminal 1: Start WebSocket server
npm run serv

# 3. Terminal 2: Start Next.js (in a new terminal)
npm run dev

# 4. Open browser
# http://localhost:3000
```

## Production Deployment

For production, use PM2 or similar to run both servers:

```bash
# Install PM2
npm install -g pm2

# Start both servers
pm2 start server.js --name websocket
pm2 start npm --name nextjs -- start

# Save configuration
pm2 save
pm2 startup
```

## Architecture

```
┌─────────────────┐         ┌──────────────────┐
│   Browser       │◄───────►│  WebSocket Server│
│  (localhost:3000)│   WS   │  (server.js:3005)│
└─────────────────┘         └──────────────────┘
         │                           ▲
         │ HTTP                      │
         ▼                           │
┌─────────────────┐                  │
│   Next.js       │──────────────────┘
│  API Routes     │  Broadcasts updates
└─────────────────┘
```

- **Next.js** (port 3000): Serves the frontend and API routes
- **WebSocket Server** (port 3005): Handles real-time communication
- **API Routes**: Send updates to WebSocket server, which broadcasts to all clients

## Summary

✅ Create `.env.local` with `NEXT_PUBLIC_WS_URL=ws://localhost:3005`
✅ Run `npm run serv` in one terminal
✅ Run `npm run dev` in another terminal  
✅ Restart Next.js after creating `.env.local`
✅ Verify green connection indicator in UI
✅ Test "Call" button functionality

If issues persist, check the troubleshooting section above!
