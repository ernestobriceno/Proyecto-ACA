import { start, io } from './server.js';
import ioClient from 'socket.io-client';

let httpServer;

afterEach(() => {
  if (httpServer) {
    io.close();
    httpServer.close();
  }
});

test('server starts without error', done => {
  httpServer = start(4000);
  httpServer.on('listening', () => {
    done();
  });
});

test('broadcasts messages', done => {
  httpServer = start(4001);
  const client1 = ioClient('http://localhost:4001', { auth: { token: 'a' } });
  const client2 = ioClient('http://localhost:4001', { auth: { token: 'b' } });

  client2.on('chat message', msg => {
    expect(msg.text).toBe('hello');
    client1.disconnect();
    client2.disconnect();
    done();
  });

  let connected = 0;
  const maybeSend = () => {
    if (++connected === 2) {
      client1.emit('chat message', 'hello');
    }
  };

  client1.on('connect', maybeSend);
  client2.on('connect', maybeSend);
}, 10000);
