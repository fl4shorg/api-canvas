const express = require('express');
const router = express.Router();
const canvafy = require('canvafy');

// Rota de boas-vindas
router.get('/welcome', async (req, res) => {
  try {
    const image = await new canvafy.WelcomeLeave()
      .setAvatar("https://cdn.discordapp.com/avatars/123456789012345678/abcdef1234567890.png?size=1024")
      .setBackground("image", "https://example.com/background.jpg")
      .setTitle("Bem-vindo!")
      .setDescription("Flash entrou no servidor ✨")
      .setBorder("#FFFFFF")
      .setAvatarBorder("#FFFFFF")
      .setOverlayOpacity(0.4)
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
    const image = await new canvafy.WelcomeLeave()
      .setAvatar("https://cdn.discordapp.com/avatars/987654321098765432/abcdef1234567890.png?size=1024")
      .setBackground("color", "#000000")
      .setTitle("Adeus!")
      .setDescription("Flash saiu do servidor 💔")
      .setBorder("#FF0000")
      .setAvatarBorder("#FF0000")
      .setOverlayOpacity(0.5)
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
    const image = await new canvafy.Rank()
      .setAvatar("https://cdn.discordapp.com/avatars/234567890123456789/abcdef1234567890.png?size=1024")
      .setBackground("color", "#1E1E2E")
      .setUsername("Flash")
      .setBorder("#00FFFF")
      .setLevel(12)
      .setRank(3)
      .setCurrentXp(350)
      .setRequiredXp(500)
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
    const image = await new canvafy.Profile()
      .setAvatar("https://cdn.discordapp.com/avatars/345678901234567890/abcdef1234567890.png?size=1024")
      .setBackground("image", "https://example.com/profile-background.jpg")
      .setStatus("online")
      .setName("Flash")
      .setBio("Desenvolvedor de bots 🧠💻")
      .setBorder("#FFFFFF")
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
    const image = await new canvafy.LevelUp()
      .setAvatar("https://cdn.discordapp.com/avatars/456789012345678901/abcdef1234567890.png?size=1024")
      .setBackground("color", "#2E2E2E")
      .setUsername("Flash")
      .setLevel(15)
      .setBorder("#FFD700")
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
    const image = await new canvafy.Ship()
      .setAvatars(
        "https://cdn.discordapp.com/avatars/567890123456789012/abcdef1234567890.png?size=1024",
        "https://cdn.discordapp.com/avatars/678901234567890123/abcdef1234567890.png?size=1024"
      )
      .setBackground("image", "https://example.com/ship-background.jpg")
      .setBorder("#FF00FF")
      .setOverlayOpacity(0.5)
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
    const image = await new canvafy.Instagram()
      .setAvatar("https://cdn.discordapp.com/avatars/789012345678901234/abcdef1234567890.png?size=1024")
      .setUsername("flash_dev")
      .setFollowers(1500)
      .setFollowing(200)
      .setPosts(100)
      .setBackground("image", "https://example.com/instagram-background.jpg")
      .setBorder("#FF1493")
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
    const image = await new canvafy.Tweet()
      .setAvatar("https://cdn.discordapp.com/avatars/890123456789012345/abcdef1234567890.png?size=1024")
      .setUsername("flash_dev")
      .setContent("Estou aprendendo a usar o Canvafy! #Canvafy #NodeJS")
      .setBackground("image", "https://example.com/tweet-background.jpg")
      .setBorder("#1DA1F2")
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
    const image = await new canvafy.Spotify()
      .setAvatar("https://cdn.discordapp.com/avatars/901234567890123456/abcdef1234567890.png?size=1024")
      .setUsername("flash_dev")
      .setSong("Blinding Lights")
      .setArtist("The Weeknd")
      .setAlbum("After Hours")
      .setBackground("image", "https://example.com/spotify-background.jpg")
      .setBorder("#1DB954")
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('spotify error', err);
    res.status(500).send('Erro ao gerar imagem de Spotify');
  }
});

// Rota de Captcha
router.get('/captcha', async (req, res) => {
  try {
    const image = await new canvafy.Captcha()
      .setText("ABCD1234")
      .setBackground("color", "#F0F0F0")
      .setBorder("#000000")
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
    const image = await new canvafy.Security()
      .setAvatar("https://cdn.discordapp.com/avatars/012345678901234567/abcdef1234567890.png?size=1024")
      .setUsername("flash_dev")
      .setStatus("online")
      .setBackground("image", "https://example.com/security-background.jpg")
      .setBorder("#FF4500")
      .build();

    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (err) {
    console.error('security error', err);
    res.status(500).send('Erro ao gerar imagem de Segurança');
  }
});

module.exports = router;