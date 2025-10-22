const express = require('express');
const router = express.Router();
const canvafy = require('canvafy');

// Rota de boas-vindas
router.get('/welcome', async (req, res) => {
  try {
    const {
      avatar = "https://cdn.discordapp.com/embed/avatars/0.png",
      background = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
      title = "Bem-vindo!",
      description = "Entrou no servidor ✨",
      border = "#FFFFFF",
      avatarBorder = "#FFFFFF",
      opacity = "0.4"
    } = req.query;

    const image = await new canvafy.WelcomeLeave()
      .setAvatar(avatar)
      .setBackground("image", background)
      .setTitle(title)
      .setDescription(description)
      .setBorder(border)
      .setAvatarBorder(avatarBorder)
      .setOverlayOpacity(parseFloat(opacity))
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('welcome error', err);
    res.status(500).send('Erro ao gerar imagem de boas-vindas');
  }
});

// Rota de despedida
router.get('/goodbye', async (req, res) => {
  try {
    const {
      avatar = "https://cdn.discordapp.com/embed/avatars/1.png",
      background = "#000000",
      title = "Adeus!",
      description = "Saiu do servidor 💔",
      border = "#FF0000",
      avatarBorder = "#FF0000",
      opacity = "0.5"
    } = req.query;

    const image = await new canvafy.WelcomeLeave()
      .setAvatar(avatar)
      .setBackground("color", background)
      .setTitle(title)
      .setDescription(description)
      .setBorder(border)
      .setAvatarBorder(avatarBorder)
      .setOverlayOpacity(parseFloat(opacity))
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('goodbye error', err);
    res.status(500).send('Erro ao gerar imagem de despedida');
  }
});

// Rota de rank
router.get('/rank', async (req, res) => {
  try {
    const {
      avatar = "https://cdn.discordapp.com/embed/avatars/2.png",
      background = "#1E1E2E",
      username = "Usuário",
      border = "#00FFFF",
      level = "1",
      rank = "1",
      currentXp = "0",
      requiredXp = "100"
    } = req.query;

    const image = await new canvafy.Rank()
      .setAvatar(avatar)
      .setBackground("color", background)
      .setUsername(username)
      .setBorder(border)
      .setLevel(parseInt(level))
      .setRank(parseInt(rank))
      .setCurrentXp(parseInt(currentXp))
      .setRequiredXp(parseInt(requiredXp))
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('rank error', err);
    res.status(500).send('Erro ao gerar imagem de rank');
  }
});

// Rota de perfil
router.get('/profile', async (req, res) => {
  try {
    const {
      userId = "123456789012345678",
      activity = "Playing a game",
      border = "#FFFFFF"
    } = req.query;

    const image = await new canvafy.Profile()
      .setUser(userId)
      .setActivity(activity)
      .setBorder(border)
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('profile error', err);
    res.status(500).send('Erro ao gerar imagem de perfil');
  }
});

// Rota de nível XP
router.get('/level', async (req, res) => {
  try {
    const {
      avatar = "https://cdn.discordapp.com/embed/avatars/4.png",
      background = "#2E2E2E",
      username = "Usuário",
      currentLevel = "1",
      nextLevel = "2",
      border = "#FFD700"
    } = req.query;

    const image = await new canvafy.LevelUp()
      .setAvatar(avatar)
      .setBackground("color", background)
      .setUsername(username)
      .setLevels(parseInt(currentLevel), parseInt(nextLevel))
      .setBorder(border)
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('level error', err);
    res.status(500).send('Erro ao gerar imagem de level');
  }
});

// Rota de ship
router.get('/ship', async (req, res) => {
  try {
    const {
      avatar1 = "https://cdn.discordapp.com/embed/avatars/0.png",
      avatar2 = "https://cdn.discordapp.com/embed/avatars/1.png",
      background = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
      border = "#FF00FF",
      opacity = "0.5"
    } = req.query;

    const image = await new canvafy.Ship()
      .setAvatars(avatar1, avatar2)
      .setBackground("image", background)
      .setBorder(border)
      .setOverlayOpacity(parseFloat(opacity))
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('ship error', err);
    res.status(500).send('Erro ao gerar imagem de ship');
  }
});

// Rota de Instagram
router.get('/instagram', async (req, res) => {
  try {
    const {
      avatar = "https://cdn.discordapp.com/embed/avatars/2.png",
      username = "usuario",
      postImage = "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
      theme = "dark",
      verified = "false"
    } = req.query;

    const image = await new canvafy.Instagram()
      .setAvatar(avatar)
      .setUser({ username })
      .setPostImage(postImage)
      .setTheme(theme)
      .setVerified(verified === "true")
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('instagram error', err);
    res.status(500).send('Erro ao gerar imagem de Instagram');
  }
});

// Rota de Tweet
router.get('/tweet', async (req, res) => {
  try {
    const {
      avatar = "https://cdn.discordapp.com/embed/avatars/3.png",
      username = "usuario",
      comment = "Olá mundo! 👋",
      theme = "dark",
      verified = "false"
    } = req.query;

    const image = await new canvafy.Tweet()
      .setAvatar(avatar)
      .setUser(username)
      .setComment(comment)
      .setTheme(theme)
      .setVerified(verified === "true")
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('tweet error', err);
    res.status(500).send('Erro ao gerar imagem de Tweet');
  }
});

// Rota de Spotify
router.get('/spotify', async (req, res) => {
  try {
    const {
      image = "https://images.unsplash.com/photo-1614680376593-902f74cf0d41",
      title = "Nome da Música",
      artist = "Nome do Artista",
      album = "Nome do Álbum",
      start = "30000",
      end = "180000"
    } = req.query;

    const startTime = parseInt(start) || 30000;
    const endTime = parseInt(end) || 180000;

    const spotifyCard = await new canvafy.oldSpotify()
      .setAuthor(artist)
      .setAlbum(album)
      .setTimestamp(startTime, endTime)
      .setImage(image)
      .setTitle(title)
      .build();

    res.set('Content-Type', 'image/png');
    res.send(spotifyCard);
  } catch (err) {
    console.error('spotify error', err);
    res.status(500).send('Erro ao gerar imagem de Spotify');
  }
});

// Rota de Captcha
router.get('/captcha', async (req, res) => {
  try {
    const {
      captcha = "abcd12",
      background = "#F0F0F0",
      border = "#000000",
      opacity = "0.5"
    } = req.query;

    const image = await new canvafy.Captcha()
      .setCaptchaKey(captcha)
      .setBackground("color", background)
      .setBorder(border)
      .setOverlayOpacity(parseFloat(opacity))
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('captcha error', err);
    res.status(500).send('Erro ao gerar imagem de Captcha');
  }
});

// Rota de Segurança
router.get('/security', async (req, res) => {
  try {
    const {
      avatar = "https://cdn.discordapp.com/embed/avatars/0.png",
      createdTimestamp = Date.now().toString(),
      suspectTimestamp = Date.now().toString(),
      background = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
      border = "#FF4500",
      avatarBorder = "#FFFFFF",
      locale = "pt"
    } = req.query;

    const image = await new canvafy.Security()
      .setAvatar(avatar)
      .setAvatarBorder(avatarBorder)
      .setCreatedTimestamp(parseInt(createdTimestamp))
      .setSuspectTimestamp(parseInt(suspectTimestamp))
      .setBackground("image", background)
      .setBorder(border)
      .setLocale(locale)
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('security error', err);
    res.status(500).send('Erro ao gerar imagem de Segurança');
  }
});

module.exports = router;
