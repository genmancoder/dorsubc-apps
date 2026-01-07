# PWA Setup & IP Configuration Guide

## Progressive Web App (PWA) Features

The Queue Kiosk is now a **Progressive Web App** that can be installed on devices and run in fullscreen mode.

---

## PWA Features Added ✅

### 1. **Fullscreen Mode**
- Kiosk runs in fullscreen without browser UI
- No address bar, navigation buttons, or tabs
- True kiosk experience on tablets and devices

### 2. **Offline Capability**
- Service worker caches assets
- Works without internet (after first load)
- Automatic updates when online

### 3. **Installable**
- Add to home screen on mobile/tablet
- Desktop shortcut support
- Standalone app experience

### 4. **Optimized for 10-Inch Displays**
- Landscape orientation preferred
- Touch-optimized interface
- Fullscreen display mode

---

## Installation Instructions

### On Android Tablet:

1. **Open Browser**
   - Use Chrome or Edge browser
   - Navigate to: `http://[SERVER-IP]:3000/requestkiosk`

2. **Install App**
   - Tap the menu (⋮) button
   - Select "Install app" or "Add to Home screen"
   - Confirm installation

3. **Launch Kiosk**
   - Find "Queue Kiosk" icon on home screen
   - Tap to launch in fullscreen
   - No browser UI visible

### On iPad/iOS:

1. **Open Safari**
   - Navigate to: `http://[SERVER-IP]:3000/requestkiosk`

2. **Add to Home Screen**
   - Tap the Share button (□↑)
   - Scroll and tap "Add to Home Screen"
   - Name it "Queue Kiosk"
   - Tap "Add"

3. **Launch App**
   - Find icon on home screen
   - Tap to open in fullscreen mode

### On Windows Tablet:

1. **Open Edge Browser**
   - Navigate to: `http://[SERVER-IP]:3000/requestkiosk`

2. **Install PWA**
   - Click the install icon (⊕) in address bar
   - Or: Menu → Apps → Install this site as an app
   - Confirm installation

3. **Launch**
   - Find "Queue Kiosk" in Start Menu
   - Launch for fullscreen experience

---

## IP Address Configuration

### Purpose
Configure the kiosk to connect to a different server (not localhost).

### Use Cases:
- **Kiosk on separate device**: Tablet displays kiosk, server runs on PC
- **Network deployment**: Multiple kiosks connecting to central server
- **Remote access**: Access queue system from different network

---

## How to Configure IP Address

### Step 1: Access Settings

1. Launch the kiosk page
2. Click the **Settings icon** (⚙️) in the top-right corner
3. Settings modal opens

### Step 2: Enter Server IP

**Format Options:**
```
192.168.1.100:3000          ← IP with port
10.10.115.21:3000          ← Network IP
http://192.168.1.100:3000  ← Full URL
server.local:3000          ← Hostname
```

**Examples:**
- Local network: `192.168.1.100:3000`
- Different port: `192.168.1.100:5000`
- HTTPS: `https://queue.example.com`

### Step 3: Save Settings

1. Enter the server IP address
2. Click "Save Settings"
3. Kiosk will reconnect to new server
4. Settings saved in browser (persistent)

### Step 4: Verify Connection

- Check footer for server indicator
- Green dot + IP shown = connected
- Windows and recent tickets should load
- If error appears, check IP/port

### Reset to Localhost

Click "Reset" button in settings to use localhost again.

---

## Network Setup Guide

### Scenario: Kiosk Tablet + Server PC

**Requirements:**
- Both devices on same network (WiFi/LAN)
- Server running on PC
- Firewall allows port 3000

**Setup Steps:**

1. **On Server PC:**
   ```bash
   # Start the server
   npm run dev
   
   # Find your IP address
   # Windows:
   ipconfig
   # Look for IPv4 Address: 192.168.1.100
   
   # Linux/Mac:
   ifconfig
   # or: ip addr
   ```

2. **On Kiosk Tablet:**
   - Open browser: `http://192.168.1.100:3000/requestkiosk`
   - Install PWA (Add to Home Screen)
   - Open Settings
   - Enter: `192.168.1.100:3000`
   - Save Settings

3. **Test:**
   - Service windows should appear
   - Generate a test ticket
   - Check recent tickets update

---

## Troubleshooting

### Issue: Can't Install PWA

**Solution:**
- Use Chrome/Edge on Android
- Use Safari on iOS
- HTTPS required for some features (development allows HTTP)
- Manifest.json must be accessible

### Issue: Can't Connect to Server

**Possible Causes:**
1. **Wrong IP Address**
   - Double-check server IP with `ipconfig` or `ifconfig`
   - Verify port number (default: 3000)

2. **Firewall Blocking**
   - Windows: Allow port 3000 in Windows Firewall
   - Check router firewall settings
   - Try disabling firewall temporarily to test

3. **Server Not Running**
   - Ensure `npm run dev` is active on server
   - Check for error messages in server console

4. **Different Network**
   - Ensure both devices on same WiFi/LAN
   - Can't connect across different networks without port forwarding

5. **CORS Issues**
   - Next.js allows all origins by default in dev
   - Production may need CORS configuration

**Test Commands:**
```bash
# From kiosk device, ping the server
ping 192.168.1.100

# Test port accessibility
# Windows PowerShell:
Test-NetConnection 192.168.1.100 -Port 3000

# Linux/Mac:
nc -zv 192.168.1.100 3000
```

### Issue: Settings Not Saving

**Solution:**
- Check browser localStorage enabled
- Private/Incognito mode doesn't persist
- Clear cache and try again

### Issue: Fullscreen Not Working

**Solution:**
- Make sure PWA is installed (not just bookmarked)
- Launch from home screen icon, not browser
- On iOS, must use "Add to Home Screen" in Safari
- Check manifest.json is accessible

---

## Files Created/Modified

### New Files:
- `public/manifest.json` - PWA manifest
- `public/icons/generate-icons.html` - Icon generator
- `PWA_SETUP.md` - This documentation

### Modified Files:
- `next.config.ts` - Added PWA configuration
- `app/layout.tsx` - Added PWA meta tags
- `app/requestkiosk/page.tsx` - Added IP configuration
- `package.json` - Added next-pwa dependency

---

## PWA Configuration Details

### Manifest Settings:
```json
{
  "display": "fullscreen",        // No browser UI
  "orientation": "landscape",     // Best for 10-inch
  "theme_color": "#3B82F6",      // Blue theme
  "background_color": "#3B82F6",  // Splash screen
  "start_url": "/requestkiosk"    // Opens kiosk directly
}
```

### Service Worker:
- Caches API responses (24 hours)
- NetworkFirst strategy
- Automatic cache cleanup
- Disabled in development mode

### Browser Support:
- ✅ Chrome/Edge (Android, Desktop)
- ✅ Safari (iOS, macOS)
- ✅ Firefox (Android, Desktop)
- ⚠️ Limited support on older browsers

---

## Production Deployment

### Build for Production:
```bash
# Build with PWA
npm run build

# Start production server
npm run start
```

### HTTPS Requirement:
- Service workers require HTTPS in production
- Use reverse proxy (nginx) with SSL certificate
- Or use services like Vercel, Netlify (auto HTTPS)

### Icon Generation:
1. Open `public/icons/generate-icons.html` in browser
2. Right-click each canvas → "Save image as..."
3. Save as: `icon-[size]x[size].png` in `public/icons/`
4. Sizes needed: 72, 96, 128, 144, 152, 192, 384, 512

---

## Advanced Configuration

### Custom Server IP Storage:

**LocalStorage Key:** `kioskServerUrl`

**JavaScript Access:**
```javascript
// Get saved URL
const serverUrl = localStorage.getItem('kioskServerUrl');

// Set new URL
localStorage.setItem('kioskServerUrl', 'http://192.168.1.100:3000');

// Clear URL (use localhost)
localStorage.removeItem('kioskServerUrl');
```

### Environment Variables:
```env
# Default server URL (optional)
NEXT_PUBLIC_DEFAULT_SERVER_URL=http://192.168.1.100:3000
```

### Network Security:
- Use HTTPS in production
- Implement API authentication if needed
- Restrict server to local network
- Use VPN for remote access

---

## Testing Checklist

### PWA Installation:
- [ ] App installs on Android tablet
- [ ] App installs on iPad
- [ ] App launches in fullscreen
- [ ] Manifest.json accessible
- [ ] Icons display correctly
- [ ] Splash screen shows

### IP Configuration:
- [ ] Settings button visible
- [ ] Can enter IP address
- [ ] Settings save to localStorage
- [ ] Windows load from remote server
- [ ] Tickets generate on remote server
- [ ] Recent tickets show from remote
- [ ] Server indicator shows in footer
- [ ] Reset button works

### Fullscreen Experience:
- [ ] No browser UI visible
- [ ] Touch targets large enough
- [ ] Landscape orientation works
- [ ] Screen doesn't timeout
- [ ] Back button behavior correct

---

## Best Practices

### For Kiosk Deployment:

1. **Network Setup**
   - Use static IP for server
   - Dedicated WiFi for kiosks
   - Strong WiFi signal at kiosk locations

2. **Device Configuration**
   - Disable screen timeout
   - Enable "Stay Awake" (Android Developer Options)
   - Use kiosk mode launcher app
   - Disable notifications

3. **Maintenance**
   - Regular app updates
   - Monitor server uptime
   - Backup settings regularly
   - Test connectivity daily

4. **Security**
   - Password-protect settings
   - Network isolation
   - Regular security updates
   - Monitor access logs

---

## Summary

### PWA Benefits:
✅ Fullscreen kiosk experience
✅ Installable on all devices
✅ Offline capability
✅ No app store needed
✅ Easy deployment

### IP Configuration Benefits:
✅ Flexible network setup
✅ Central server deployment
✅ Multiple kiosks supported
✅ Remote server access
✅ Easy reconfiguration

### Next Steps:
1. Install PWA on kiosk device
2. Configure server IP
3. Test ticket generation
4. Deploy to production

Need help? Check troubleshooting section or server logs for errors.

