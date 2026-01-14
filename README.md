# Camera Share PWA

A Progressive Web App for sharing camera photos on iPhone and other devices.

## Features

- 📷 **Camera Access**: Access your device's camera(s) directly in the browser
- 🔄 **Switch Cameras**: Toggle between front and back cameras on mobile devices
- 📸 **Capture Photos**: Take photos with a single tap
- 📤 **Share Photos**: Share captured photos using the native share dialog (or download on unsupported devices)
- 📱 **PWA Support**: Install as an app on your iPhone or Android device
- 🎨 **Modern UI**: Beautiful gradient design optimized for mobile
- ⚡ **Offline Ready**: Service worker enables basic offline functionality

## Usage

1. Open `camera-share-pwa.html` in a modern web browser
2. Click "Start Camera" to access your device camera
3. Grant camera permissions when prompted
4. Click "Capture Photo" to take a picture
5. Click "Share Photo" to share via native share dialog or download

## iPhone Installation

1. Open the PWA in Safari on your iPhone
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to install the app
5. Launch from your home screen for full-screen experience

## Browser Compatibility

- ✅ Safari (iOS 11+)
- ✅ Chrome (Android)
- ✅ Edge, Firefox, and other modern browsers
- ⚠️ Requires HTTPS for camera access (except on localhost)

## Files

- `camera-share-pwa.html` - Main application
- `manifest.json` - PWA manifest
- `sw.js` - Service worker

## Development

To test locally:
```bash
python3 -m http.server 8080
```

Then open http://localhost:8080/camera-share-pwa.html

## License

MIT
