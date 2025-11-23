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

    const templatePath = path.join(__dirname, '..', 'templates', 'tonyquadro_template.jpg');
    const templateImg = await loadImage(templatePath);

    const canvas = createCanvas(templateImg.width, templateImg.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(templateImg, 0, 0);

    let customImg;
    try {
      customImg = await loadImage(imageUrl);
    } catch (e) {
      console.error('Erro ao carregar imagem:', e.message);
      return res.status(400).json({ message: "Erro ao carregar a imagem da URL fornecida" });
    }

    const frameX = 49;
    const frameY = 31;
    const frameWidth = 406;
    const frameHeight = 573;

    const frameAspect = frameWidth / frameHeight;
    const imgAspect = customImg.width / customImg.height;
    
    let sx, sy, sWidth, sHeight;
    
    if (imgAspect > frameAspect) {
      sHeight = customImg.height;
      sWidth = sHeight * frameAspect;
      sx = (customImg.width - sWidth) / 2;
      sy = 0;
    } else {
      sWidth = customImg.width;
      sHeight = sWidth / frameAspect;
      sx = 0;
      sy = (customImg.height - sHeight) / 2;
    }
    
    ctx.drawImage(customImg, sx, sy, sWidth, sHeight, frameX, frameY, frameWidth, frameHeight);

    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
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
