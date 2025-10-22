# Canvas API

A Node.js API server that generates dynamic images using canvas libraries. Perfect for Discord bots, social media applications, and any service that needs programmatic image generation.

## Available Endpoints

### Ping Banner
Generate a futuristic network status banner with user info and network statistics:

- `GET /ping` - Network status banner (estilo futurista cyberpunk)

**Query Parameters:**
- `name` - Nome do usuário (padrão: "NEEXT")
- `avatar` - URL da imagem do avatar
- `wallpaper` - URL da imagem de fundo
- `datetime` - Data e hora customizada (formato: "DD/MM/YYYY - HH:MM")
- `speed` - Velocidade de conexão (padrão: "999")
- `latency` - Percentual de latência 0-100 (padrão: "2")
- `pingMs` - Ping em milissegundos (padrão: "15")
- `loss` - Perda de pacotes em % (padrão: "0")
- `upload` - Velocidade de upload em MB/s (padrão: "850")
- `download` - Velocidade de download em MB/s (padrão: "950")
- `cpu` - Uso de CPU em % (padrão: "45")
- `ram` - Uso de RAM em % (padrão: "62")
- `disk` - Uso de disco em % (padrão: "78")
- `os` - Sistema operacional (padrão: "LINUX")
- `id` - ID do usuário (padrão: "0000000000")
- `vip` - Status VIP (padrão: "PREMIUM")
- `rank` - Rank do usuário (padrão: "#1")

**Example:**
```
GET /ping?name=GODDARD&speed=999&latency=2&pingMs=15&loss=0&upload=850&os=LINUX
```

### Music Cards (Musicard2)
Generate music player card images with different themes:

- `GET /musicard2/classic` - Classic theme
- `GET /musicard2/classicpro` - ClassicPro theme
- `GET /musicard2/dynamic` - Dynamic theme
- `GET /musicard2/mini` - Mini theme
- `GET /musicard2/upcoming` - Upcoming tracks

**Query Parameters:**
- `title` (required) - Song title
- `artist` - Artist name
- `cover` - Cover image URL
- `wallpaper` - Background image URL
- `progress` - Progress percentage (0-100)
- `startTime` - Start time (e.g., "0:00")
- `endTime` - End time (e.g., "3:30")

**Example:**
```
GET /musicard2/classic?title=My%20Song&artist=Artist%20Name&progress=50&startTime=0:00&endTime=3:30
```

### Music Cards (Musicard Quartz)
Generate music cards with Quartz-style themes:

- `GET /musicard/quartz` - Quartz+ theme
- `GET /musicard/onepiece` - OnePiece+ theme
- `GET /musicard/vector` - Vector+ theme

**Query Parameters:**
- `title` (required) - Song title
- `artist` - Artist name
- `cover` - Cover image URL
- `wallpaper` - Background image URL
- `color` - Theme color
- `minutes` - Duration minutes
- `seconds` - Duration seconds

**Example:**
```
GET /musicard/quartz?title=My%20Song&artist=Artist%20Name&minutes=3&seconds=30
```

### Discord-Style Cards (Canvafy)

User engagement and social cards:

- `GET /welcome` - Welcome card
- `GET /goodbye` - Goodbye/leave card
- `GET /rank` - Rank/XP card
- `GET /profile` - User profile card
- `GET /level` - Level up card
- `GET /ship` - Relationship ship card

Social media cards:

- `GET /instagram` - Instagram profile card
- `GET /tweet` - Twitter/X tweet card
- `GET /spotify` - Spotify now playing card

Utility cards:

- `GET /captcha` - CAPTCHA image
- `GET /security` - Security verification card

*Note: These endpoints have example hardcoded data. For production use, they should accept query parameters.*

## Running Locally

```bash
npm install
npm start
```

The server will start on port 5000 (or use the PORT environment variable if set).

## API Response

All endpoints return PNG images with appropriate headers:
```
Content-Type: image/png
```

## Dependencies

- Express.js - Web framework
- canvas - HTML5 Canvas implementation
- canvafy - Discord-style image generation
- musicard - Music card generation
- musicard-quartz - Additional music card themes

## System Requirements

Requires the following system libraries (for canvas native bindings):
- util-linux (provides libuuid)
- libuuid
- pkg-config

These are automatically configured in the Replit environment.
