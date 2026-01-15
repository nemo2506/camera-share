/*
 *  Camera Share - Socket.IO Signaling Server
 *  
 *  This server facilitates WebRTC peer-to-peer connections between
 *  iPhone camera (sender) and PC browser (receiver) on a local network.
 *  
 *  The server handles:
 *  - SDP offer/answer exchange
 *  - ICE candidate transmission
 *  - Room management for peer pairing
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

// Create HTTP server to serve static files
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Initialize Socket.IO with CORS settings for local network
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Store active rooms and clients
const rooms = new Map();

io.on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}] Client connected: ${socket.id}`);

  // Handle room joining
  socket.on('join-room', (roomId) => {
    console.log(`[${new Date().toISOString()}] Client ${socket.id} joining room: ${roomId}`);
    
    socket.join(roomId);
    socket.roomId = roomId;

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(socket.id);

    const roomClients = Array.from(rooms.get(roomId));
    console.log(`[${new Date().toISOString()}] Room ${roomId} now has ${roomClients.length} client(s)`);

    // Notify the joining client about other peers in the room
    const otherClients = roomClients.filter(id => id !== socket.id);
    socket.emit('room-ready', { peers: otherClients });
    
    if (otherClients.length > 0) {
      // Notify other clients about the new peer
      socket.to(roomId).emit('peer-joined', { peerId: socket.id });
    }
  });

  // Handle WebRTC offer
  socket.on('offer', ({ offer, roomId, targetId }) => {
    console.log(`[${new Date().toISOString()}] Relaying offer from ${socket.id} to ${targetId || 'room'}`);
    
    if (targetId) {
      // Send to specific peer
      io.to(targetId).emit('offer', { offer, senderId: socket.id });
    } else {
      // Broadcast to room
      socket.to(roomId).emit('offer', { offer, senderId: socket.id });
    }
  });

  // Handle WebRTC answer
  socket.on('answer', ({ answer, targetId }) => {
    console.log(`[${new Date().toISOString()}] Relaying answer from ${socket.id} to ${targetId}`);
    io.to(targetId).emit('answer', { answer, senderId: socket.id });
  });

  // Handle ICE candidates
  socket.on('ice-candidate', ({ candidate, roomId, targetId }) => {
    console.log(`[${new Date().toISOString()}] Relaying ICE candidate from ${socket.id}`);
    
    if (targetId) {
      io.to(targetId).emit('ice-candidate', { candidate, senderId: socket.id });
    } else {
      socket.to(roomId).emit('ice-candidate', { candidate, senderId: socket.id });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`[${new Date().toISOString()}] Client disconnected: ${socket.id}`);
    
    if (socket.roomId && rooms.has(socket.roomId)) {
      rooms.get(socket.roomId).delete(socket.id);
      
      if (rooms.get(socket.roomId).size === 0) {
        rooms.delete(socket.roomId);
        console.log(`[${new Date().toISOString()}] Room ${socket.roomId} deleted (empty)`);
      } else {
        // Notify other peers about disconnection
        socket.to(socket.roomId).emit('peer-left', { peerId: socket.id });
      }
    }
  });

  // Handle hangup
  socket.on('hangup', ({ roomId }) => {
    console.log(`[${new Date().toISOString()}] Client ${socket.id} hanging up`);
    socket.to(roomId).emit('peer-hangup', { peerId: socket.id });
  });
});

// Get local network IP address
function getLocalIpAddress() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIpAddress();
  console.log('='.repeat(60));
  console.log('Camera Share - Signaling Server Running');
  console.log('='.repeat(60));
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Network: http://${localIp}:${PORT}`);
  console.log('='.repeat(60));
  console.log('');
  console.log(`iPhone client: http://${localIp}:${PORT}/iphone-client.html`);
  console.log(`PC client:     http://${localIp}:${PORT}/pc-client.html`);
  console.log('');
  console.log('Share the network URL with devices on your local network');
  console.log('='.repeat(60));
});
