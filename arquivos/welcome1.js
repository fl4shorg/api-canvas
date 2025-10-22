const express = require('express');
const router = express.Router();
const WelCard = require('welcard');

// Rota de boas-vindas usando WelCard
router.get('/welcome1', async (req, res) => {
  const username = req.query.username || 'Flash';
  const avatar = req.query.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png';

  try {
    const welcard = new WelCard()
      .setUsername(username)
      .setAvatar(avatar)
      .setBackground('https://picsum.photos/800/400') // imagem de fundo
      .setTextColor('#FFFFFF')
      .setOverlayOpacity(0.5);

    const imageBuffer = await welcard.build(); // gera o buffer da imagem

    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (err) {
    console.error('welcome1 error', err);
    res.status(500).send('Erro ao gerar imagem de boas-vindas com WelCard');
  }
});

module.exports = router;