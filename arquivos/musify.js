const express = require('express');
const router = express.Router();
const { Glass } = require('musify');

router.get('/musify', async (req, res) => {
  try {
    const {
      thumbnail = 'https://i.imgur.com/5lEfqA7.png',
      name = 'Musify',
      author = 'Unknown Artist',
      requester = 'Unknown',
      progress = '0',
      startTime = '0:00',
      endTime = '0:00',
      scale = '1',
      backgroundColor = '#1c1c1c',
      backgroundImage = '',
      backgroundBlur = '10',
      backgroundDarkness = '0.9',
      nameColor = 'auto',
      authorColor = '#FFFFFF',
      requesterColor = 'auto',
      progressColor = 'auto',
      timeColor = '#FFFFFF'
    } = req.query;

    const config = {
      thumbnailImage: thumbnail,
      name: name,
      author: author,
      requester: requester,
      progress: parseFloat(progress),
      startTime: startTime,
      endTime: endTime,
      scale: parseFloat(scale),
      backgroundColor: backgroundColor,
      backgroundBlur: parseFloat(backgroundBlur),
      backgroundDarkness: parseFloat(backgroundDarkness),
      authorColor: authorColor,
      timeColor: timeColor
    };

    if (backgroundImage) {
      config.backgroundImage = backgroundImage;
    }

    if (nameColor !== 'auto') {
      config.nameColor = nameColor;
    }

    if (requesterColor !== 'auto') {
      config.requesterColor = requesterColor;
    }

    if (progressColor !== 'auto') {
      config.progressColor = progressColor;
    }

    const buffer = await Glass(config);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(buffer);
  } catch (err) {
    console.error('Erro musify:', err);
    res.status(500).send('Erro ao gerar card de música');
  }
});

module.exports = router;
