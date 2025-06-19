# Chat Integration Audit

This document verifies the integration of the group chat across the backend, frontend and moderation services.

## Installation
- `npm install` executed in `Backend/` without errors.
- `pip install -r requirements.txt` executed in `Moderation/` without errors.
- `npm start` runs the backend server on port 3000 and serves the React app (`Frontend/src/components/Chat.jsx`).

## Testing
- Accessing `http://localhost:3000` displays the chat UI and messages broadcast in real time.
- Messages containing banned words are rejected by the moderation service.
- `npm test` (Backend) and `pytest` (Moderation) run successfully.

No additional issues were detected.
