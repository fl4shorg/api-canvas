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

### Ping2 Banner (Neon Style)
Generate a simplified neon-style banner with centered avatar and speed indicator:

- `GET /ping2` - Neon banner with centered avatar and speed (estilo premium neon)

**Query Parameters:**
- `name` - Nome do usuário (padrão: "NEEXT")
- `speed` - Velocidade/número exibido (padrão: "999")
- `label` - Texto do rótulo inferior (padrão: "VELOCIDADE")
- `system` - Sistema/texto adicional opcional (padrão: "")
- `datetime` - Data e hora customizada (formato: "DD/MM/YYYY - HH:MM")
- `avatar` - URL da imagem do avatar
- `wallpaper` - URL da imagem de fundo

**Example:**
```
GET /ping2?name=GODDARD&speed=850&label=VELOCIDADE&system=LINUX&avatar=URL&wallpaper=URL
```

**Visual Features:**
- Centered circular avatar with cyan/white borders
- Robot icon next to username
- Large speed/number display with speedometer icon
- Neon cyan glow effects
- Date/time indicators in corners
- Blue gradient background (or custom wallpaper)

### ATTP - Animated Text to Picture
Generate animated GIF stickers with text in different styles:

- `GET /attp` - Animated text GIF generator with multiple style options

**Query Parameters:**
- `type` (required) - Style type: `attp`, `attp1`, `attp2`, `attp3`, `attp4`, `attp5`, `attp6`, `attp7`, `attp8`, `attp9`, `attp10`, `attp11`, `attp12`
- `texto` (required) - Text to display in the GIF

**Example:**
```
GET /attp?type=attp10&texto=Hello%20World
```

**Available Styles:**
- `attp` - Bold colorful text with random HSL colors
- `attp1` - Italic Comic Sans with random RGB colors
- `attp2` - Bold Impact with yellow stroke/outline
- `attp3` - Bold colorful text with pastel HSL colors
- `attp4` - Bold cyan text
- `attp5` - Bold text with muted HSL colors
- `attp6` - Bold lime green text
- `attp7` - Bold text with random RGB colors
- `attp8` - Bold gold text
- `attp9` - Bold white text with shadow effect
- `attp10` - Bold text with rainbow gradient (red→blue→green)
- `attp11` - Bold purple text with white stroke/outline
- `attp12` - Bold colorful text with shadow blur effect

**Features:**
- 10-frame animated GIF (512x512 pixels)
- Each frame displays the text with the selected style
- Different colors animate in random patterns (for styles with random colors)
- Perfect for creating animated stickers for messaging apps

### Musify Glass Cards
Generate modern music cards with glass design and auto color extraction:

- `GET /musify` - Professional music card with glass design effect

**Query Parameters:**
- `thumbnail` - URL da imagem/capa da música (padrão: imagem exemplo)
- `name` - Título da música (padrão: "Musify")
- `author` - Nome do artista (padrão: "Unknown Artist")
- `requester` - Usuário que solicitou (padrão: "Unknown")
- `progress` - Progresso em % 0-100 (padrão: "0")
- `startTime` - Tempo atual MM:SS (padrão: "0:00")
- `endTime` - Duração total MM:SS (padrão: "0:00")
- `scale` - Escala 0.5-2 (padrão: "1")
- `backgroundColor` - Cor de fundo (padrão: "#1c1c1c")
- `backgroundImage` - URL da imagem de fundo (opcional)
- `backgroundBlur` - Desfoque do fundo 0-50 (padrão: "10")
- `backgroundDarkness` - Escuridão do fundo 0-1 (padrão: "0.9")
- `nameColor` - Cor do título (padrão: "auto" - extração automática)
- `authorColor` - Cor do artista (padrão: "#FFFFFF")
- `requesterColor` - Cor do solicitante (padrão: "auto")
- `progressColor` - Cor da barra de progresso (padrão: "auto")
- `timeColor` - Cor dos tempos (padrão: "#FFFFFF")

**Example:**
```
GET /musify?name=Bohemian%20Rhapsody&author=Queen&requester=MusicLover&progress=45&startTime=2:15&endTime=5:55&thumbnail=URL
```

**Features:**
- Modern glass design with rounded corners
- Automatic color extraction from thumbnail
- Progress bar animation
- Background blur and darkness effects
- Fully customizable colors and scale

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
  - Parameters: `avatar`, `background`, `title`, `description`, `border`, `avatarBorder`, `opacity`
- `GET /goodbye` - Goodbye/leave card
  - Parameters: `avatar`, `background`, `title`, `description`, `border`, `avatarBorder`, `opacity`
- `GET /rank` - Rank/XP card
  - Parameters: `avatar`, `background`, `username`, `border`, `level`, `rank`, `currentXp`, `requiredXp`
- `GET /profile` - User profile card
  - Parameters: `userId`, `activity`, `border`
- `GET /level` - Level up card
  - Parameters: `avatar`, `background`, `username`, `currentLevel`, `nextLevel`, `border`
- `GET /ship` - Relationship ship card
  - Parameters: `avatar1`, `avatar2`, `background`, `border`, `opacity`

Social media cards:

- `GET /instagram` - Instagram profile card
  - Parameters: `avatar`, `username`, `postImage`, `theme`, `verified`
- `GET /tweet` - Twitter/X tweet card
  - Parameters: `avatar`, `username`, `comment`, `theme`, `verified`
- `GET /spotify` - Spotify now playing card
  - Parameters: `image`, `title`, `artist`, `album`, `start`, `end`

Utility cards:

- `GET /captcha` - CAPTCHA image
  - Parameters: `captcha`, `background`, `border`, `opacity`
- `GET /security` - Security verification card
  - Parameters: `avatar`, `createdTimestamp`, `suspectTimestamp`, `background`, `border`, `avatarBorder`, `locale`

### Knights Canvas Cards

Discord bot image generation with various templates:

**Welcome & Goodbye Cards:**

- `GET /knights/welcome` - Welcome card (style 1)
  - Parameters: `username`, `guildName`, `guildIcon`, `memberCount`, `avatar`, `background`
- `GET /knights/welcome2` - Welcome card (style 2)
  - Parameters: `username`, `groupname`, `member`, `avatar`, `background`
- `GET /knights/goodbye` - Goodbye/leave card
  - Parameters: `username`, `guildName`, `guildIcon`, `memberCount`, `avatar`, `background`

**Example:**
```
GET /knights/welcome?username=JohnDoe&guildName=MyServer&memberCount=1000&avatar=URL&background=URL
```

**Level & Rank Cards:**

- `GET /knights/rank` - XP/Rank progress card
  - Parameters: `username`, `avatar`, `background`, `needxp`, `currxp`, `level`, `rank`
- `GET /knights/levelup` - Level up notification card
  - Parameters: `avatar`

**Example:**
```
GET /knights/rank?username=Player1&level=10&currxp=500&needxp=1000&avatar=URL
GET /knights/levelup?avatar=URL
```

**Image Filters & Effects:**

- `GET /knights/horny` - Horny jail filter
  - Parameters: `avatar`
- `GET /knights/jojo` - JoJo anime style filter
  - Parameters: `image`
- `GET /knights/patrick` - Patrick meme template
  - Parameters: `avatar`
- `GET /knights/bonk` - Bonk meme with two avatars
  - Parameters: `avatar1`, `avatar2`
- `GET /knights/burn` - SpongeBob burning paper meme
  - Parameters: `avatar`

**Example:**
```
GET /knights/bonk?avatar1=URL1&avatar2=URL2
GET /knights/horny?avatar=URL
```

### Photooxy Text Effects

Generate custom text effects using the Photooxy.com service:

- `GET /photooxy` - Create text effects from Photooxy templates

**Query Parameters:**
- `url` (required) - Full URL of the Photooxy effect template
- `text` (required) - Text to apply to the effect (can be string or comma-separated for multiple lines)

**Example:**
```
GET /photooxy?url=https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html&text=NEEXT
```

**Important Notes:**
- This endpoint depends on the external photooxy.com service
- The service may have anti-bot protections and might not work consistently
- If this endpoint doesn't work, consider using the other image generation endpoints available in this API

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
- musify - Professional music cards with glass design
- knights-canvas - Discord bot image generation (welcome, rank, memes)
- cheerio - HTML parsing (for photooxy)
- axios - HTTP client
- form-data - Multipart form data (for photooxy)

## System Requirements

Requires the following system libraries (for canvas native bindings):
- util-linux (provides libuuid)
- libuuid
- pkg-config

These are automatically configured in the Replit environment.
