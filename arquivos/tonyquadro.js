const express = require('express');
const router = express.Router();
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const path = require('path');

router.get('/tonyquadro', async (req, res) => {
  try {
    const overlayPath = path.join(__dirname, '..', 'templates', 'tonyquadro_overlay.png');
    const overlayImg = await loadImage(overlayPath);

    const canvas = createCanvas(overlayImg.width, overlayImg.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(overlayImg, 0, 0);

    const buffer = canvas.toBuffer('image/png');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(buffer);
  } catch (err) {
    console.error('Erro:', err);
    res.status(500).json({ error: "Erro ao gerar imagem" });
  }
});

module.exports = router;
