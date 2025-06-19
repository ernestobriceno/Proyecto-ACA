import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat.jsx';

const token = localStorage.getItem('token');

if (!token) {
  // Redirigir o mostrar mensaje si no hay token
  window.location.href = '/login';
} else {
  createRoot(document.getElementById('root')).render(<Chat token={token} />);
}
