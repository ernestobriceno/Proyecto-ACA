# Chat Integration Audit

This document verifies the integration of the group chat across the backend, frontend and moderation services.

## Installation
- `npm install` executed in `Backend/` without errors.
- `pip install -r requirements.txt` executed in `Moderation/` without errors.
- `npm start` runs the backend server on port 3000 and serves the React chat interface.

## Testing
- Accessing `http://localhost:3000` displays the chat UI and messages broadcast in real time.
- Messages containing banned words are rejected by the moderation service.
- `npm test` still fails as no tests are specified.

No additional issues were detected.
