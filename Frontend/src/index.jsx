import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat.jsx';

const token = localStorage.getItem('token');
if (!token) {
    // Redirect to login page or display a message
    window.location.href = '/login'; // Example: Redirect to login page
} else {
    createRoot(document.getElementById('root')).render(<Chat token={token} />);
}
