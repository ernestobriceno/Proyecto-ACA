import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';

export default function Chat({ token }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socket = useMemo(() => io('/', { auth: { token } }), [token]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((m) => [...m, msg]);
    });
    socket.on('chat rejected', reason => alert('Mensaje rechazado: ' + reason));
    return () => socket.disconnect();
  }, [socket]);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    socket.emit('chat message', text.trim());
    setText('');
  };

  return (
    <div className="chat">
      <ul className="messages">
        {messages.map((m) => (
          <li key={m.id}><strong>{m.user}:</strong> {m.text}</li>
        ))}
      </ul>
      <form onSubmit={send} className="input-form">
        <input value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
