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

  socket.on('chat message', async (msg) => {
    try {
      // Send message to moderation service
      const res = await fetch('http://localhost:8000/moderate', {
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
      console.error('Moderation error', err);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
