import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.static('../Frontend'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Simple auth middleware for Socket.IO
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication required'));
  }
  // For demo purposes, accept any non-empty token
  socket.user = { token };
  next();
});

io.on('connection', (socket) => {
  console.log('User connected', socket.user.token);
  socket.lastMessage = 0;

  socket.on('chat message', async (msg) => {
    if (!msg || !msg.trim()) return;
    const now = Date.now();
    if (now - socket.lastMessage < 1000) return; // simple rate limit
    socket.lastMessage = now;
    try {
      const url = process.env.MOD_URL || 'http://localhost:8000/moderate';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg })
      });
      const data = await res.json();
      if (data.allowed) {
        io.emit('chat message', { user: socket.user.token, text: msg });
      } else {
        socket.emit('chat rejected', data.reason);
      }
    } catch (err) {
      if (process.env.MOD_URL) {
        console.error('Moderation error', err);
      } else {
        io.emit('chat message', { user: socket.user.token, text: msg });
      }
    }
  });
});

export function start(port = process.env.PORT || 3000) {
  return server.listen(port, () => {
    console.log(`Backend running on port ${port}`);
  });
}
export { io };

if (process.env.NODE_ENV !== 'test') {
  start();
}
