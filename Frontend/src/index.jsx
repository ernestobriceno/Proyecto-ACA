import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat.jsx';

const token = localStorage.getItem('token') || 'usuario';
createRoot(document.getElementById('root')).render(<Chat token={token} />);
