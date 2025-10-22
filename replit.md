# API Canvas

## Overview
This is a Canvas API server that generates dynamic images using various Node.js libraries. The API provides endpoints for creating music cards, welcome/goodbye images, user profiles, rank cards, and various social media templates.

## Project Type
Backend API service (Express.js)

## Core Libraries
- **express**: Web server framework
- **canvafy**: Image generation for Discord-style cards (welcome, rank, profile, etc.)
- **musicard**: Music card generation (Classic, ClassicPro, Dynamic, Mini, Upcoming themes)
- **musicard-quartz**: Music card generation (Quartz+, OnePiece+, Vector+ themes)
- **canvas / @napi-rs/canvas**: Canvas rendering libraries

## API Endpoints

### Canvafy Routes
- `/welcome` - Welcome card
- `/goodbye` - Goodbye/leave card
- `/rank` - Rank/XP card
- `/profile` - User profile card
- `/level` - Level up card
- `/ship` - Relationship ship card
- `/instagram` - Instagram profile card
- `/tweet` - Twitter/X tweet card
- `/spotify` - Spotify now playing card
- `/captcha` - CAPTCHA image
- `/security` - Security verification card

### Musicard Quartz Routes
- `/musicard/quartz` - Quartz+ theme music card
- `/musicard/onepiece` - OnePiece+ theme music card
- `/musicard/vector` - Vector+ theme music card

### Musicard2 Routes
- `/musicard2/classic` - Classic theme music card
- `/musicard2/classicpro` - ClassicPro theme music card
- `/musicard2/dynamic` - Dynamic theme music card
- `/musicard2/mini` - Mini theme music card
- `/musicard2/upcoming` - Upcoming tracks card

## Project Structure
```
.
├── index.js              # Main Express server
├── arquivos/             # Route modules
│   ├── canvasfy.js      # Canvafy image routes
│   ├── musicard.js      # Musicard-quartz routes
│   ├── musicard2.js     # Musicard routes
│   ├── welcome1.js      # WelCard route (unused)
│   └── attp.js          # Empty file
├── package.json         # Dependencies and scripts
└── replit.md           # This file
```

## Running the Server
The server runs on port 3000 and listens on all interfaces (0.0.0.0).

```bash
npm start
```

## System Dependencies
The following system packages are required for canvas image generation:
- `libuuid` - Required for the canvas library native bindings

## Recent Changes (October 22, 2025)
- Configured for Replit environment
- Added environment variable support for PORT (defaults to 3000)
- Added start script to package.json
- Created .gitignore for Node.js
- Installed system dependency: libuuid (required for canvas)
- Created documentation (this file and README.md)
- Verified API is functional (tested musicard2 endpoints successfully)

## User Preferences
None set yet.
