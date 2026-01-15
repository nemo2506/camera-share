# 📱💻 Camera Share - WebRTC P2P Camera Sharing

Share your iPhone camera to a Windows PC over a local network using WebRTC and Socket.IO signaling.

## 🌟 Features

- **Real-time camera streaming** from iPhone to PC
- **Peer-to-peer connection** via WebRTC
- **Socket.IO signaling server** for establishing connections
- **Local network only** - secure by network isolation
- **Easy setup** with room-based pairing
- **Responsive UI** optimized for mobile and desktop

## 🏗️ Architecture

```
┌─────────────┐                    ┌─────────────┐
│   iPhone    │                    │   Windows   │
│  (Sender)   │                    │   PC (RX)   │
│             │                    │             │
│  Camera ────┼──── WebRTC P2P ────┼──── Video   │
│  Stream     │                    │  Display    │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │        Socket.IO Signaling       │
       └────────────┬─────────────────────┘
                    │
              ┌─────▼──────┐
              │  Node.js   │
              │  Server    │
              │ (Signaling)│
              └────────────┘
```

The signaling server only facilitates the initial connection setup by exchanging SDP offers/answers and ICE candidates. Once established, video streams directly peer-to-peer.

## 📋 Prerequisites

- **Node.js** v14.0.0 or higher
- **Modern browsers** with WebRTC support:
  - iPhone: Safari (iOS 11+)
  - PC: Chrome, Edge, Firefox
- Both devices on the **same local network** (WiFi/LAN)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Signaling Server

```bash
npm start
```

The server will display:
```
============================================================
Camera Share - Signaling Server Running
============================================================
Local:   http://localhost:3000
Network: http://192.168.1.100:3000
============================================================

iPhone client: http://192.168.1.100:3000/iphone-client.html
PC client:     http://192.168.1.100:3000/pc-client.html

Share the network URL with devices on your local network
============================================================
```

**💡 Tip**: If you have connection issues, first visit `http://[SERVER_IP]:3000/connection-test.html` on your iPhone to diagnose the problem.

### 3. Connect iPhone (Sender)

1. On your iPhone, open Safari
2. Navigate to: `http://[SERVER_IP]:3000/iphone-client.html`
   - Replace `[SERVER_IP]` with the network IP shown by the server
   - **Recommended**: iOS 14+ for best compatibility
3. Enter a **Room ID** (e.g., `room123`)
4. Tap **"Start Camera & Share"**
5. Allow camera and microphone access when prompted

### 4. Connect PC (Receiver)

1. On your PC, open Chrome/Edge/Firefox
2. Navigate to: `http://[SERVER_IP]:3000/pc-client.html`
   - Use the same network IP as iPhone
3. Enter the **same Room ID** as iPhone (e.g., `room123`)
4. Click **"Connect to Room"**
5. Video should appear within a few seconds

## 🔧 Configuration

### Server Port

Change the port by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### ICE Servers (STUN/TURN)

The application uses Google's public STUN servers by default. For better connectivity across different network configurations, you can configure custom STUN/TURN servers in:

- `iphone-client.html` - Line ~250 (config object)
- `pc-client.html` - Line ~280 (config object)

```javascript
const config = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { 
            urls: 'turn:your-turn-server.com:3478',
            username: 'username',
            credential: 'password'
        }
    ]
};
```

## 📱 Supported Devices

### iPhone (Sender)
- iOS 11+ with Safari
- Requires camera and microphone permissions
- Works best with WiFi connection

### PC (Receiver)
- Windows 10/11
- Chrome 60+, Edge 79+, Firefox 60+
- macOS and Linux also supported

## 🔐 Security Notes

- **Local network only**: Server binds to `0.0.0.0` but should only be accessed within your local network
- **No authentication**: Room IDs are the only access control
- **HTTPS recommended**: For production use, implement HTTPS and add proper authentication
- **Firewall**: Ensure port 3000 (or your chosen port) is accessible on your local network

## 🛠️ Troubleshooting

### Quick Diagnostic Tool

**NEW**: Use the built-in connection test page to diagnose issues:
```
http://[SERVER_IP]:3000/connection-test.html
```

This tool will:
- ✅ Verify HTTP server connectivity
- ✅ Test Socket.IO connection
- ✅ Check WebRTC support
- ✅ Validate camera API availability
- ✅ Detect iOS version and provide specific guidance

### Connection Issues

**Problem**: Video doesn't appear
- ✅ **First, run the connection test** at `http://[SERVER_IP]:3000/connection-test.html`
- ✅ Verify both devices are on the same network
- ✅ Check that Room IDs match exactly
- ✅ Ensure server is running (check terminal)
- ✅ Try refreshing both clients
- ✅ Check browser console for errors (F12)

**Problem**: "Failed to access camera"
- ✅ Grant camera/microphone permissions in browser
- ✅ Ensure no other app is using the camera
- ✅ On iPhone, check Settings > Safari > Camera
- ✅ **iOS requirement**: iOS 14+ required for camera access on local network IPs
- ✅ **For iOS 13 and below**: HTTPS is required for camera access

**Problem**: iPhone can't connect to server
- ✅ **Run connection test first**: `http://[SERVER_IP]:3000/connection-test.html`
- ✅ Verify the IP address is correct (check server terminal output)
- ✅ Ensure iPhone is on the same WiFi network as PC
- ✅ Try accessing the main page first: `http://[SERVER_IP]:3000/`
- ✅ Check if corporate/guest WiFi is blocking connections
- ✅ Disable any VPN on either device

**Problem**: Server won't start
- ✅ Verify Node.js is installed: `node --version`
- ✅ Run `npm install` to install dependencies
- ✅ Check if port 3000 is already in use

### Network Discovery

To find your server's IP address:

**Windows**:
```cmd
ipconfig
```
Look for "IPv4 Address" under your active network adapter

**macOS/Linux**:
```bash
ifconfig
```
Look for "inet" address (usually starts with 192.168.x.x or 10.x.x.x)

### Debug Mode

Enable verbose logging in browser console:
1. Open Developer Tools (F12)
2. Check the Console tab for detailed connection logs
3. Both clients log all signaling and connection events

## 📂 Project Structure

```
camera-share/
├── server/
│   └── signaling-server.js    # Socket.IO signaling server
├── iphone-client.html          # iPhone sender interface
├── pc-client.html              # PC receiver interface
├── index.html                  # Original WebRTC demo
├── js/
│   └── main.js                 # Original demo code
├── css/
│   └── main.css                # Styles for original demo
├── package.json                # Node.js dependencies
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🔄 How It Works

### Signaling Process

1. **Server Start**: Node.js server starts and listens for Socket.IO connections
2. **iPhone Joins**: iPhone client connects and joins a room with specific ID
3. **PC Joins**: PC client connects and joins the same room
4. **Offer Creation**: iPhone creates WebRTC offer with camera stream
5. **Offer Relay**: Server relays offer from iPhone to PC
6. **Answer Creation**: PC creates WebRTC answer
7. **Answer Relay**: Server relays answer from PC to iPhone
8. **ICE Exchange**: Both clients exchange ICE candidates via server
9. **P2P Connection**: Direct peer-to-peer connection established
10. **Streaming**: Video/audio streams directly between devices

### Technologies Used

- **Backend**: Node.js with Socket.IO v4.6
- **Frontend**: Vanilla JavaScript with WebRTC API
- **Signaling**: Socket.IO WebSocket connections
- **Streaming**: WebRTC PeerConnection API
- **STUN**: Google STUN servers for NAT traversal

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Add authentication/authorization
- Implement TURN server for better connectivity
- Add support for multiple simultaneous connections
- Implement recording functionality
- Add screen sharing option
- Create mobile app versions

## 📄 License

This project incorporates code samples from the WebRTC project, which are licensed under the BSD-style license. See individual file headers for details.

## 🙏 Acknowledgments

- WebRTC Project for code samples and documentation
- Socket.IO team for the excellent real-time library
- Google for public STUN servers

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review browser console logs
3. Check server terminal logs
4. Open an issue on GitHub

---

**Made with ❤️ for simple camera sharing over local networks**
