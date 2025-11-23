const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

async function createOverlay() {
  const templatePath = path.join(__dirname, 'templates', 'tonyquadro_template.jpg');
  const img = await loadImage(templatePath);
  
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  
  // Desenhar apenas - sem manipulação de pixels
  ctx.drawImage(img, 0, 0);
  
  // Extrair dados brutos
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Remover APENAS branco puro (255,255,255,255)
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
      data[i + 3] = 0; // Transparência
    }
  }
  
  // Colocar de volta
  ctx.putImageData(imageData, 0, 0);
  
  // Salvar em PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'templates', 'tonyquadro_overlay.png'), buffer);
  console.log('✅ Overlay criado com sucesso!');
}

createOverlay().catch(console.error);
