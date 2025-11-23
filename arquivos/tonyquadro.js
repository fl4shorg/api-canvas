const express = require('express');
const router = express.Router();
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const path = require('path');

router.get('/tonyquadro', async (req, res) => {
  try {
    const imageUrl = req.query.image;

    if (!imageUrl) {
      return res.status(400).json({ message: "Faltando o parâmetro 'image' com a URL da imagem" });
    }

    const overlayPath = path.join(__dirname, '..', 'templates', 'tonyquadro_overlay.png');
    const overlayImg = await loadImage(overlayPath);

    const canvas = createCanvas(overlayImg.width, overlayImg.height);
    const ctx = canvas.getContext('2d');

    let customImg;
    try {
      customImg = await loadImage(imageUrl);
    } catch (e) {
      console.error('Erro ao carregar imagem:', e.message);
      return res.status(400).json({ message: "Erro ao carregar a imagem da URL fornecida" });
    }

    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = customImg.width / customImg.height;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgAspect > canvasAspect) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgAspect;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgAspect;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }
    
    ctx.drawImage(customImg, drawX, drawY, drawWidth, drawHeight);
    ctx.drawImage(overlayImg, 0, 0);

    const buffer = canvas.toBuffer('image/jpeg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(buffer);
  } catch (err) {
    console.error('Erro ao gerar imagem do Tony Quadro:', err);
    res.status(500).json({ error: "Erro ao gerar imagem" });
  }
});

module.exports = router;
