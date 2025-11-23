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

    // Carregar o template PNG com área branca do quadro transparente
    const overlayPath = path.join(__dirname, '..', 'templates', 'tonyquadro_overlay.png');
    const overlayImg = await loadImage(overlayPath);

    // Criar canvas com o tamanho do template
    const canvas = createCanvas(overlayImg.width, overlayImg.height);
    const ctx = canvas.getContext('2d');

    // Carregar a imagem customizada
    let customImg;
    try {
      customImg = await loadImage(imageUrl);
    } catch (e) {
      console.error('Erro ao carregar imagem:', e.message);
      return res.status(400).json({ message: "Erro ao carregar a imagem da URL fornecida" });
    }

    // PASSO 1: Desenhar a imagem customizada ATRÁS (preenchendo toda a área)
    // Calcular para preencher mantendo proporção
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = customImg.width / customImg.height;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgAspect > canvasAspect) {
      // Imagem mais larga - ajustar pela altura
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgAspect;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      // Imagem mais alta - ajustar pela largura
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgAspect;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }
    
    // Desenhar a imagem customizada preenchendo o fundo
    ctx.drawImage(customImg, drawX, drawY, drawWidth, drawHeight);
    
    // PASSO 2: Desenhar o overlay (Tony + quadro) POR CIMA
    // A área branca é transparente, então a imagem customizada aparece só ali
    ctx.drawImage(overlayImg, 0, 0);

    // Retornar a imagem final
    const buffer = canvas.toBuffer('image/png');
    res.setHeader('Content-Type', 'image/png');
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
