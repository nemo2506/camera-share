# Camera Share PWA

A Progressive Web App for sharing camera photos on iPhone and other devices, secured for local network use only.

## Quick Start

📦 **Download**: Get the ready-to-use package [`camera-share-pwa.zip`](camera-share-pwa.zip) - contains all files without version control

Simply extract the ZIP file and open `camera-share-pwa.html` in your browser or deploy to a web server.

## Features

- 📷 **Camera Access**: Access your device's camera(s) directly in the browser
- 🔄 **Switch Cameras**: Toggle between front and back cameras on mobile devices
- 📸 **Capture Photos**: Take photos with a single tap
- 📤 **Share Photos**: Share captured photos using the native share dialog (or download on unsupported devices)
- 📱 **PWA Support**: Install as an app on your iPhone or Android device
- 🎨 **Modern UI**: Beautiful gradient design optimized for mobile
- ⚡ **Offline Ready**: Service worker enables basic offline functionality
- 🔒 **Local Network Security**: App restricted to local network access only (no authentication required)

## Security

**Local Network Only**: This app is configured to work exclusively on local networks for privacy and security. It will only function when accessed from:
- `localhost` (127.0.0.1)
- Local IP addresses (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
- IPv6 localhost (::1, fe80::)

Access from external/public networks will be blocked with a security notice. No user IDs, passwords, or authentication are required.

## Usage

1. Access the app from your local network (e.g., `http://192.168.1.100:8080/camera-share-pwa.html`)
2. Click "Start Camera" to access your device camera
3. Grant camera permissions when prompted
4. Click "Capture Photo" to take a picture
5. Click "Share Photo" to share via native share dialog or download

## iPhone Installation

1. Open the PWA in Safari on your iPhone (from local network)
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to install the app
5. Launch from your home screen for full-screen experience

## Browser Compatibility

- ✅ Safari (iOS 11+)
- ✅ Chrome (Android)
- ✅ Edge, Firefox, and other modern browsers
- ⚠️ Requires HTTPS for camera access (except on localhost)
- ⚠️ Must be accessed from local network addresses

## Files

- `camera-share-pwa.html` - Main application with local network security
- `manifest.json` - PWA manifest
- `sw.js` - Service worker

## Development

To test locally:
```bash
python3 -m http.server 8080
```

Then open http://localhost:8080/camera-share-pwa.html

To access from other devices on your local network, use your computer's local IP address:
```
http://192.168.1.x:8080/camera-share-pwa.html
```

## License

MIT
