const express = require('express');
const router = express.Router();
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const path = require('path');

router.get('/bolsonaro', async (req, res) => {
  try {
    const imageUrl = req.query.image;

    if (!imageUrl) {
      return res.status(400).json({ message: "Faltando o parâmetro 'image' com a URL da imagem" });
    }

    // Carregar a imagem template do Bolsonaro
    const templatePath = path.join(__dirname, '..', 'templates', 'bolsonaro_template.jpg');
    const templateImg = await loadImage(templatePath);

    // Criar canvas com o tamanho do template
    const canvas = createCanvas(templateImg.width, templateImg.height);
    const ctx = canvas.getContext('2d');

    // Desenhar o template PRIMEIRO (fundo)
    ctx.drawImage(templateImg, 0, 0);

    // Carregar a imagem customizada
    let customImg;
    try {
      customImg = await loadImage(imageUrl);
    } catch (e) {
      console.error('Erro ao carregar imagem:', e.message);
      return res.status(400).json({ message: "Erro ao carregar a imagem da URL fornecida" });
    }

    // Coordenadas EXATAS da tela/quadro branco (sem pegar braço, rosto, etc)
    // Ajustadas para cobrir SOMENTE a área branca da TV
    const screenX = 180;      // posição X do quadro (mais pra direita)
    const screenY = 27;       // posição Y do quadro (um pouco mais abaixo)
    const screenWidth = 440;  // largura do quadro (menor para não pegar o braço)
    const screenHeight = 255; // altura do quadro (menor para não pegar embaixo da TV)

    // Calcular para PREENCHER TODO o quadro (cover mode - tipo chroma key)
    // A imagem vai ocupar todo o espaço branco, cortando o que sobrar
    const imgAspect = customImg.width / customImg.height;
    const screenAspect = screenWidth / screenHeight;

    let drawWidth, drawHeight, drawX, drawY;
    let sourceX = 0, sourceY = 0, sourceWidth = customImg.width, sourceHeight = customImg.height;

    if (imgAspect > screenAspect) {
      // Imagem é mais larga - ajustar pela altura (preenche verticalmente)
      // e cortar os lados
      const scaledWidth = customImg.width * (screenHeight / customImg.height);
      const cropX = (scaledWidth - screenWidth) / 2;
      
      sourceWidth = customImg.width * (screenWidth / scaledWidth);
      sourceX = (customImg.width - sourceWidth) / 2;
      
      drawWidth = screenWidth;
      drawHeight = screenHeight;
      drawX = screenX;
      drawY = screenY;
    } else {
      // Imagem é mais alta - ajustar pela largura (preenche horizontalmente)
      // e cortar o topo/base
      const scaledHeight = customImg.height * (screenWidth / customImg.width);
      const cropY = (scaledHeight - screenHeight) / 2;
      
      sourceHeight = customImg.height * (screenHeight / scaledHeight);
      sourceY = (customImg.height - sourceHeight) / 2;
      
      drawWidth = screenWidth;
      drawHeight = screenHeight;
      drawX = screenX;
      drawY = screenY;
    }

    // Desenhar a imagem customizada preenchendo TODO o quadro branco
    // A imagem será desenhada POR CIMA do quadro branco do template
    // Sintaxe: drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(customImg, sourceX, sourceY, sourceWidth, sourceHeight, drawX, drawY, drawWidth, drawHeight);

    // Retornar a imagem final
    const buffer = canvas.toBuffer('image/png');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(buffer);
  } catch (err) {
    console.error('Erro ao gerar imagem do Bolsonaro:', err);
    res.status(500).json({ error: "Erro ao gerar imagem" });
  }
});

module.exports = router;
