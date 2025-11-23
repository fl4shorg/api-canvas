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

    // Desenhar o template primeiro
    ctx.drawImage(templateImg, 0, 0);

    // Carregar a imagem customizada
    let customImg;
    try {
      customImg = await loadImage(imageUrl);
    } catch (e) {
      console.error('Erro ao carregar imagem:', e.message);
      return res.status(400).json({ message: "Erro ao carregar a imagem da URL fornecida" });
    }

    // Coordenadas e dimensões da tela/quadro branco
    // Analisando a imagem, o quadro branco está aproximadamente em:
    const screenX = 153;      // posição X do quadro
    const screenY = 20;       // posição Y do quadro
    const screenWidth = 478;  // largura do quadro
    const screenHeight = 270; // altura do quadro

    // Calcular como ajustar a imagem para caber no quadro mantendo proporção
    const imgAspect = customImg.width / customImg.height;
    const screenAspect = screenWidth / screenHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgAspect > screenAspect) {
      // Imagem é mais larga - ajustar pela largura
      drawWidth = screenWidth;
      drawHeight = screenWidth / imgAspect;
      drawX = screenX;
      drawY = screenY + (screenHeight - drawHeight) / 2;
    } else {
      // Imagem é mais alta - ajustar pela altura
      drawHeight = screenHeight;
      drawWidth = screenHeight * imgAspect;
      drawX = screenX + (screenWidth - drawWidth) / 2;
      drawY = screenY;
    }

    // Desenhar a imagem customizada no quadro
    ctx.drawImage(customImg, drawX, drawY, drawWidth, drawHeight);

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
