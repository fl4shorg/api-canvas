const express = require('express');
const router = express.Router();
const { createCanvas, loadImage } = require('@napi-rs/canvas');

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

async function drawPing2Banner(config) {
  const W = 1365;
  const H = 618;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  let wallpaperImg = null;
  let avatarImg = null;

  try {
    if (config.wallpaper) wallpaperImg = await loadImage(config.wallpaper);
  } catch (e) {
    console.error('Erro ao carregar wallpaper:', e.message);
  }

  try {
    if (config.avatar) avatarImg = await loadImage(config.avatar);
  } catch (e) {
    console.error('Erro ao carregar avatar:', e.message);
  }

  ctx.clearRect(0, 0, W, H);

  // Draw background
  if (wallpaperImg) {
    const img = wallpaperImg;
    const r = Math.max(W / img.width, H / img.height);
    const iw = img.width * r;
    const ih = img.height * r;
    const ox = (W - iw) / 2;
    const oy = (H - ih) / 2;
    ctx.drawImage(img, ox, oy, iw, ih);
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0a1635');
    g.addColorStop(1, '#0a1129');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const g2 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H);
    g2.addColorStop(0, 'rgba(0, 247, 255, 0.05)');
    g2.addColorStop(1, 'rgba(180, 0, 255, 0.05)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  }

  // Date and time
  const now = new Date();
  const dateText = config.datetime?.trim()
    ? config.datetime.split(' - ')[0]
    : now.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const timeText = config.datetime?.trim()
    ? config.datetime.split(' - ')[1]
    : now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });

  // Draw date icon (top-left)
  ctx.save();
  ctx.translate(30, 25);
  ctx.beginPath();
  roundRect(ctx, -2, -2, 24, 24, 4);
  ctx.strokeStyle = '#00f7ff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  roundRect(ctx, -2, -2, 24, 8, 4);
  ctx.fillStyle = '#00f7ff';
  ctx.fill();

  ctx.strokeStyle = '#00f7ff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(5, 8);
  ctx.lineTo(5, 22);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(10, 8);
  ctx.lineTo(10, 22);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(15, 8);
  ctx.lineTo(15, 22);
  ctx.stroke();

  ctx.restore();

  // Date text
  ctx.font = '600 18px Arial, sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText(dateText, 65, 25);

  // Time text
  ctx.textAlign = 'right';
  ctx.fillText(timeText, W - 30, 25);

  // Clock icon (top-right)
  const timeWidth = ctx.measureText(timeText).width;
  ctx.save();
  ctx.translate(W - 30 - timeWidth - 20, 37);

  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.strokeStyle = '#00f7ff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -7);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(5, 0);
  ctx.stroke();
  ctx.restore();

  ctx.textAlign = 'left';

  // Avatar
  const centerX = W / 2;
  const avatarY = H * 0.25;
  const avatarR = 100;

  ctx.save();
  if (avatarImg) {
    // Outer circle background
    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR + 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();

    // Clip for avatar
    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const img = avatarImg;
    const r = Math.max((avatarR * 2) / img.width, (avatarR * 2) / img.height);
    const iw = img.width * r;
    const ih = img.height * r;
    ctx.drawImage(img, centerX - iw / 2, avatarY - ih / 2, iw, ih);
    ctx.restore();

    // White border
    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.stroke();

    // Cyan outer border
    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR + 4, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 247, 255, 0.7)';
    ctx.stroke();
  } else {
    // Default avatar circle
    ctx.beginPath();
    ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.stroke();
  }

  // Name text
  const name = (config.name || 'NEEXT').toUpperCase();
  ctx.font = '900 80px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  // Calculate name width for robot icon positioning
  const nameWidth = ctx.measureText(name).width;
  const robotIconX = centerX - nameWidth / 2 - 50;

  // Robot icon
  ctx.save();
  ctx.translate(robotIconX, avatarY + avatarR + 40);

  ctx.beginPath();
  roundRect(ctx, 0, 0, 35, 45, 5);
  ctx.fillStyle = '#00f7ff';
  ctx.fill();

  ctx.beginPath();
  roundRect(ctx, 5, -15, 25, 20, 3);
  ctx.fillStyle = '#00f7ff';
  ctx.fill();

  // Robot eyes
  ctx.beginPath();
  ctx.arc(12, -8, 3, 0, Math.PI * 2);
  ctx.arc(23, -8, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();

  // Robot antenna
  ctx.beginPath();
  ctx.moveTo(17, -15);
  ctx.lineTo(17, -25);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00f7ff';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(17, -25, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#ff0055';
  ctx.fill();
  ctx.restore();

  // Name with glow
  ctx.shadowColor = '#00f7ff';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, centerX, avatarY + avatarR + 20);
  ctx.shadowBlur = 0;

  // Speed number
  const speed = String(config.speed || '999');
  ctx.font = '900 70px Arial, sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#00f7ff';
  ctx.shadowColor = '#00f7ff';
  ctx.shadowBlur = 15;
  ctx.fillText(speed, centerX, avatarY + avatarR + 120);
  ctx.shadowBlur = 0;

  // Speedometer icon
  ctx.save();
  ctx.translate(centerX + 180, avatarY + avatarR + 155);

  ctx.beginPath();
  ctx.arc(0, 0, 22, 0.25 * Math.PI, 0.75 * Math.PI);
  ctx.strokeStyle = '#00f7ff';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.save();
  ctx.rotate(0.5 * Math.PI);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -18);
  ctx.strokeStyle = '#ff0055';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#00f7ff';
  ctx.fill();
  ctx.restore();

  // Label text
  const label = (config.label || 'VELOCIDADE').toUpperCase();
  ctx.font = '700 40px Arial, sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, centerX, avatarY + avatarR + 200);

  // System text (optional)
  const system = (config.system || '').toUpperCase();
  if (system) {
    ctx.font = '600 28px Arial, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#b8e6ff';
    ctx.shadowColor = '#00f7ff';
    ctx.shadowBlur = 8;
    ctx.fillText(system, centerX, avatarY + avatarR + 250);
    ctx.shadowBlur = 0;
  }

  // Decorative horizontal line
  ctx.beginPath();
  const lineY = avatarY + avatarR + 90;
  ctx.moveTo(centerX - 200, lineY);
  ctx.lineTo(centerX + 200, lineY);
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(0, 247, 255, 0.3)';
  ctx.stroke();

  ctx.textAlign = 'start';
  ctx.shadowBlur = 0;

  return canvas.toBuffer('image/png');
}

router.get('/ping2', async (req, res) => {
  try {
    const config = {
      name: req.query.name || 'NEEXT',
      speed: req.query.speed || '999',
      label: req.query.label || 'VELOCIDADE',
      system: req.query.system || '',
      datetime: req.query.datetime || '',
      wallpaper: req.query.wallpaper || '',
      avatar: req.query.avatar || ''
    };

    const buffer = await drawPing2Banner(config);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(buffer);
  } catch (err) {
    console.error('Erro ping2:', err);
    res.status(500).send('Erro ao gerar banner ping2');
  }
});

module.exports = router;
