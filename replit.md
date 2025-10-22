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
- **knights-canvas**: Discord bot image generation (welcome, goodbye, rank, level-up, meme filters)
- **canvas / @napi-rs/canvas**: Canvas rendering libraries

## API Endpoints

### Ping Routes
- `/ping` - Banner de status de rede futurista (cyberpunk style)

### Canvafy Routes
- `/welcome` - Welcome card (params: avatar, background, title, description, border, avatarBorder, opacity)
- `/goodbye` - Goodbye card (params: avatar, background, title, description, border, avatarBorder, opacity)
- `/rank` - Rank/XP card (params: avatar, background, username, border, level, rank, currentXp, requiredXp)
- `/profile` - User profile card (params: userId, activity, border)
- `/level` - Level up card (params: avatar, background, username, currentLevel, nextLevel, border)
- `/ship` - Relationship ship card (params: avatar1, avatar2, background, border, opacity)
- `/instagram` - Instagram profile card (params: avatar, username, postImage, theme, verified)
- `/tweet` - Twitter/X tweet card (params: avatar, username, comment, theme, verified)
- `/spotify` - Spotify now playing card (params: image, title, artist, album, start, end)
- `/captcha` - CAPTCHA image (params: captcha, background, border, opacity)
- `/security` - Security verification card (params: avatar, createdTimestamp, suspectTimestamp, background, border, avatarBorder, locale)

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

### Knights Canvas Routes
- `/knights/welcome` - Welcome card style 1 (params: username, guildName, guildIcon, memberCount, avatar, background)
- `/knights/welcome2` - Welcome card style 2 (params: username, groupname, member, avatar, background)
- `/knights/goodbye` - Goodbye/leave card (params: username, guildName, guildIcon, memberCount, avatar, background)
- `/knights/rank` - XP/Rank progress card (params: username, avatar, background, needxp, currxp, level, rank)
- `/knights/levelup` - Level up notification (params: avatar)
- `/knights/horny` - Horny jail filter (params: avatar)
- `/knights/jojo` - JoJo anime style filter (params: image)
- `/knights/patrick` - Patrick meme template (params: avatar)
- `/knights/bonk` - Bonk meme with two avatars (params: avatar1, avatar2)
- `/knights/burn` - SpongeBob burning paper meme (params: avatar)

## Project Structure
```
.
├── index.js              # Main Express server
├── arquivos/             # Route modules
│   ├── canvasfy.js      # Canvafy image routes
│   ├── musicard.js      # Musicard-quartz routes
│   ├── musicard2.js     # Musicard routes
│   ├── ping.js          # Ping network status banner
│   ├── welcome2.js      # Knights-canvas routes (NEW)
│   ├── welcome1.js      # WelCard route (unused)
│   └── attp.js          # Empty file
├── package.json         # Dependencies and scripts
└── replit.md           # This file
```

## Running the Server
The server runs on port 5000 (Replit environment) or uses PORT environment variable, and listens on all interfaces (0.0.0.0).

```bash
npm start
```

## Deployment
Configured for autoscale deployment (stateless API server). The deployment automatically scales based on incoming requests.

## System Dependencies
The following system packages are required for canvas image generation:
- `util-linux` - Provides libuuid library
- `libuuid` - Required for the canvas library native bindings
- `pkg-config` - Build configuration helper

## Recent Changes (October 22, 2025)
- **Fresh GitHub Clone Setup**: Successfully cloned and configured project from GitHub
- **System Dependencies**: Installed util-linux and pkg-config for canvas native bindings
- **Node.js Dependencies**: Cleaned and reinstalled all npm packages to rebuild native bindings
- **Workflow Configuration**: Created "Server" workflow running on port 5000 with webview output
- **Deployment Configuration**: Set up autoscale deployment with `npm start` command
- **Testing**: Verified API is working correctly - ping endpoint returns beautiful cyberpunk PNG banners
- **Knights Canvas Integration**: Added knights-canvas library with 10 new endpoints
  - Installed knights-canvas npm package
  - Created `arquivos/welcome2.js` with all knights-canvas routes
  - Added endpoints for welcome cards, goodbye cards, rank cards, level-up, and meme filters (horny, jojo, patrick, bonk, burn)
  - Updated index.js to include welcome2 routes
  - Updated documentation in README.md and replit.md with all new endpoints
- **Server Status**: Running successfully on http://0.0.0.0:5000

## User Preferences
None set yet.
