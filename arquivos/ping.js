const express = require('express');
const router = express.Router();
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const path = require('path');

const isValidImageUrl = (url) => {
  if (!url) return true;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    return true;
  } catch {
    return false;
  }
};

async function drawBanner(config) {
  const W = 1365;
  const H = 618;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  let wallpaperImg = null;
  let avatarImg = null;

  try {
    if (config.wallpaper) {
      wallpaperImg = await loadImage(config.wallpaper);
    }
  } catch (e) {
    console.error('Erro ao carregar wallpaper:', e.message);
  }

  try {
    if (config.avatar) {
      avatarImg = await loadImage(config.avatar);
    }
  } catch (e) {
    console.error('Erro ao carregar avatar:', e.message);
  }

  if (wallpaperImg) {
    const img = wallpaperImg;
    const r = Math.max(W / img.width, H / img.height);
    const iw = img.width * r;
    const ih = img.height * r;
    const ox = (W - iw) / 2;
    const oy = (H - ih) / 2;
    ctx.drawImage(img, ox, oy, iw, ih);
    
    ctx.fillStyle = "rgba(10, 15, 30, 0.7)";
    ctx.fillRect(0, 0, W, H);
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#0a1635");
    g.addColorStop(1, "#0a1129");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const g2 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H);
    g2.addColorStop(0, "rgba(0, 247, 255, 0.05)");
    g2.addColorStop(1, "rgba(180, 0, 255, 0.05)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  }

  ctx.strokeStyle = "rgba(0, 247, 255, 0.3)";
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.lineTo(300, 200);
  ctx.moveTo(0, 200);
  ctx.lineTo(320, 300);
  ctx.moveTo(50, H);
  ctx.lineTo(320, 400);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(W, 100);
  ctx.lineTo(W - 300, 200);
  ctx.moveTo(W, 200);
  ctx.lineTo(W - 320, 300);
  ctx.moveTo(W - 50, H);
  ctx.lineTo(W - 320, 400);
  ctx.stroke();

  const now = new Date();
  const dateText = config.datetime?.trim() 
    ? config.datetime.split(" - ")[0] 
    : now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const timeText = config.datetime?.trim() 
    ? config.datetime.split(" - ")[1] 
    : now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });

  ctx.save();
  ctx.translate(30, 30);
  
  ctx.beginPath();
  ctx.roundRect(0, 0, 22, 24, 4);
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.beginPath();
  ctx.roundRect(0, 0, 22, 6, 4);
  ctx.fillStyle = "#00f7ff";
  ctx.fill();
  
  ctx.strokeStyle = "rgba(0, 247, 255, 0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(7, 10);
  ctx.lineTo(7, 20);
  ctx.moveTo(14, 10);
  ctx.lineTo(14, 20);
  ctx.moveTo(3, 14);
  ctx.lineTo(19, 14);
  ctx.stroke();
  
  ctx.restore();

  ctx.font = "700 16px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText(dateText, 62, 42);
  ctx.shadowBlur = 0;

  ctx.textAlign = "right";
  ctx.font = "700 16px Arial, sans-serif";
  ctx.fillText(timeText, W - 60, 42);
  
  ctx.save();
  ctx.translate(W - 30, 30);
  
  ctx.beginPath();
  ctx.arc(0, 12, 11, 0, Math.PI * 2);
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.lineTo(0, 5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.lineTo(6, 12);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(0, 12, 2, 0, Math.PI * 2);
  ctx.fillStyle = "#00f7ff";
  ctx.fill();
  
  ctx.restore();
  
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const leftPanelX = 40;
  const leftPanelY = 90;
  const leftPanelW = 300;
  const leftPanelH = 180;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(leftPanelX, leftPanelY, leftPanelW, leftPanelH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(leftPanelX + 15, leftPanelY);
  ctx.lineTo(leftPanelX, leftPanelY);
  ctx.lineTo(leftPanelX, leftPanelY + 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(leftPanelX + leftPanelW - 15, leftPanelY);
  ctx.lineTo(leftPanelX + leftPanelW, leftPanelY);
  ctx.lineTo(leftPanelX + leftPanelW, leftPanelY + 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(leftPanelX + 15, leftPanelY + leftPanelH);
  ctx.lineTo(leftPanelX, leftPanelY + leftPanelH);
  ctx.lineTo(leftPanelX, leftPanelY + leftPanelH - 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(leftPanelX + leftPanelW - 15, leftPanelY + leftPanelH);
  ctx.lineTo(leftPanelX + leftPanelW, leftPanelY + leftPanelH);
  ctx.lineTo(leftPanelX + leftPanelW, leftPanelY + leftPanelH - 15);
  ctx.stroke();
  
  const smallAvatarX = leftPanelX + 60;
  const smallAvatarY = leftPanelY + 60;
  const smallAvatarR = 40;
  
  if (avatarImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(smallAvatarX, smallAvatarY, smallAvatarR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    const img = avatarImg;
    const r = Math.max((smallAvatarR * 2) / img.width, (smallAvatarR * 2) / img.height);
    const iw = img.width * r;
    const ih = img.height * r;
    ctx.drawImage(img, smallAvatarX - iw / 2, smallAvatarY - ih / 2, iw, ih);
    ctx.restore();
    
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const x = smallAvatarX + Math.cos(angle) * (smallAvatarR + 5);
      const y = smallAvatarY + Math.sin(angle) * (smallAvatarR + 5);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  
  ctx.font = "700 16px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText((config.name || "NEEXT").toUpperCase(), leftPanelX + 120, leftPanelY + 35);
  ctx.shadowBlur = 0;
  
  ctx.font = "400 10px Arial, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("▸ ID: " + (config.id || "0000000000"), leftPanelX + 120, leftPanelY + 55);
  ctx.fillText("▸ VIP: " + (config.vip || "PREMIUM"), leftPanelX + 120, leftPanelY + 72);
  ctx.fillText("▸ RANK: " + (config.rank || "#1"), leftPanelX + 120, leftPanelY + 89);
  
  ctx.fillStyle = "#00ff9d";
  ctx.beginPath();
  ctx.arc(leftPanelX + 115, leftPanelY + 58, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#00f7ff";
  ctx.beginPath();
  ctx.arc(leftPanelX + 115, leftPanelY + 75, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff0055";
  ctx.beginPath();
  ctx.arc(leftPanelX + 115, leftPanelY + 92, 3, 0, Math.PI * 2);
  ctx.fill();

  const graphY = leftPanelY + 125;
  const barHeights = [15, 25, 18, 30, 22, 28, 20];
  const barWidth = 8;
  const barGap = 10;
  
  for (let i = 0; i < barHeights.length; i++) {
    ctx.fillStyle = "rgba(0, 247, 255, 0.6)";
    ctx.fillRect(
      leftPanelX + 20 + i * (barWidth + barGap),
      graphY + 30 - barHeights[i],
      barWidth,
      barHeights[i]
    );
  }

  const centerX = W / 2;
  const centerY = H / 2 - 20;
  const bigRadius = 140;

  const pingPercent = Math.min(parseFloat(config.latency || 2) / 100, 1);
  
  ctx.save();
  ctx.translate(centerX, centerY);
  
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const distance = bigRadius + 35;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    ctx.font = "700 10px Arial, sans-serif";
    ctx.fillStyle = "#00f7ff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const label = (i * 125).toString();
    ctx.fillText(label, x, y);
  }
  
  ctx.beginPath();
  ctx.arc(0, 0, bigRadius + 25, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 247, 255, 0.2)";
  ctx.lineWidth = 1;
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(0, 0, bigRadius + 15, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 247, 255, 0.3)";
  ctx.lineWidth = 2;
  ctx.stroke();
  
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x1 = Math.cos(angle) * (bigRadius + 10);
    const y1 = Math.sin(angle) * (bigRadius + 10);
    const x2 = Math.cos(angle) * (bigRadius + 20);
    const y2 = Math.sin(angle) * (bigRadius + 20);
    
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  ctx.beginPath();
  ctx.arc(0, 0, bigRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 8;
  ctx.stroke();
  
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(0, 0, bigRadius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * pingPercent));
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  if (avatarImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, bigRadius - 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    const img = avatarImg;
    const r = Math.max(((bigRadius - 15) * 2) / img.width, ((bigRadius - 15) * 2) / img.height);
    const iw = img.width * r;
    const ih = img.height * r;
    ctx.drawImage(img, -iw / 2, -ih / 2, iw, ih);
    ctx.restore();
  }
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(0, 0, bigRadius - 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.restore();

  ctx.font = "700 12px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 10;
  ctx.fillText("●", centerX - 30, centerY + bigRadius + 20);
  ctx.shadowBlur = 0;
  
  ctx.font = "700 24px Arial, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 10;
  ctx.fillText((config.name || "NEEXT").toUpperCase(), centerX + 30, centerY + bigRadius + 15);
  ctx.shadowBlur = 0;

  ctx.font = "700 80px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 20;
  ctx.fillText(config.speed || "999", centerX, centerY + bigRadius + 70);
  ctx.shadowBlur = 0;

  ctx.font = "700 24px Arial, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("VELOCIDADE", centerX, centerY + bigRadius + 155);

  ctx.font = "400 14px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  
  const osText = config.os || "LINUX";
  const osWidth = ctx.measureText("● " + osText).width;
  const osX = centerX - osWidth / 2;
  
  ctx.fillText("●", centerX - osWidth / 2 + 5, centerY + bigRadius + 185);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(osText, centerX + 15, centerY + bigRadius + 185);

  const rightPanelBaseX = W - 280;
  const latPanelY = 90;
  const latPanelW = 250;
  const latPanelH = 80;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightPanelBaseX, latPanelY, latPanelW, latPanelH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rightPanelBaseX + 15, latPanelY);
  ctx.lineTo(rightPanelBaseX, latPanelY);
  ctx.lineTo(rightPanelBaseX, latPanelY + 15);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(rightPanelBaseX + latPanelW - 15, latPanelY);
  ctx.lineTo(rightPanelBaseX + latPanelW, latPanelY);
  ctx.lineTo(rightPanelBaseX + latPanelW, latPanelY + 15);
  ctx.stroke();
  
  ctx.font = "700 13px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.textAlign = "left";
  ctx.fillText("▸ LATÊNCIA", rightPanelBaseX + 20, latPanelY + 20);
  ctx.shadowBlur = 0;
  
  ctx.save();
  ctx.translate(rightPanelBaseX + 60, latPanelY + 50);
  
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 247, 255, 0.2)";
  ctx.lineWidth = 1;
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 3;
  ctx.stroke();
  
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(0, 0, 20, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * pingPercent));
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 13px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText((config.latency || "2") + "%", 0, 0);
  ctx.shadowBlur = 0;
  ctx.restore();
  
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const lapPanelY = latPanelY + latPanelH + 20;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightPanelBaseX, lapPanelY, latPanelW, latPanelH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rightPanelBaseX + latPanelW - 15, lapPanelY + latPanelH);
  ctx.lineTo(rightPanelBaseX + latPanelW, lapPanelY + latPanelH);
  ctx.lineTo(rightPanelBaseX + latPanelW, lapPanelY + latPanelH - 15);
  ctx.stroke();
  
  ctx.font = "700 13px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ LAPN10AR", rightPanelBaseX + 20, lapPanelY + 20);
  ctx.shadowBlur = 0;
  
  ctx.font = "400 10px Arial, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("• PING: " + (config.pingMs || "15") + "ms", rightPanelBaseX + 20, lapPanelY + 48);
  ctx.fillText("• LOSS: " + (config.loss || "0") + "%", rightPanelBaseX + 135, lapPanelY + 48);
  
  const pingProgress = Math.min(parseFloat(config.pingMs || 15) / 100, 1);
  const lossProgress = Math.min(parseFloat(config.loss || 0) / 100, 1);
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(rightPanelBaseX + 20, lapPanelY + 60, 100, 4);
  ctx.fillStyle = "#00ff9d";
  ctx.fillRect(rightPanelBaseX + 20, lapPanelY + 60, 100 * pingProgress, 4);
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(rightPanelBaseX + 135, lapPanelY + 60, 95, 4);
  ctx.fillStyle = "#00f7ff";
  ctx.fillRect(rightPanelBaseX + 135, lapPanelY + 60, 95 * (1 - lossProgress), 4);

  const latGraphY = lapPanelY + latPanelH + 20;
  const latGraphH = 90;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightPanelBaseX, latGraphY, 120, latGraphH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 11px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ LATÊNCIA", rightPanelBaseX + 12, latGraphY + 15);
  ctx.shadowBlur = 0;
  
  const latBarHeights = [20, 35, 25, 40, 30, 45];
  for (let i = 0; i < latBarHeights.length; i++) {
    const gradient = ctx.createLinearGradient(0, latGraphY + 65, 0, latGraphY + 65 - latBarHeights[i]);
    gradient.addColorStop(0, "rgba(0, 247, 255, 0.3)");
    gradient.addColorStop(1, "rgba(0, 247, 255, 0.9)");
    ctx.fillStyle = gradient;
    ctx.fillRect(rightPanelBaseX + 12 + i * 16, latGraphY + 65 - latBarHeights[i], 10, latBarHeights[i]);
  }

  const uploadPanelX = rightPanelBaseX + 130;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(uploadPanelX, latGraphY, 120, latGraphH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(uploadPanelX + 120 - 15, latGraphY + latGraphH);
  ctx.lineTo(uploadPanelX + 120, latGraphY + latGraphH);
  ctx.lineTo(uploadPanelX + 120, latGraphY + latGraphH - 15);
  ctx.stroke();
  
  ctx.font = "700 11px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ UPLOAD", uploadPanelX + 12, latGraphY + 15);
  ctx.shadowBlur = 0;
  
  ctx.font = "700 22px Arial, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(config.upload || "850", uploadPanelX + 60, latGraphY + 40);
  
  ctx.font = "400 10px Arial, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("MB/s", uploadPanelX + 60, latGraphY + 68);

  const downloadPanelY = latGraphY + latGraphH + 20;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(rightPanelBaseX, downloadPanelY, 120, latGraphH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rightPanelBaseX + 15, downloadPanelY + latGraphH);
  ctx.lineTo(rightPanelBaseX, downloadPanelY + latGraphH);
  ctx.lineTo(rightPanelBaseX, downloadPanelY + latGraphH - 15);
  ctx.stroke();
  
  ctx.font = "700 11px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.textAlign = "left";
  ctx.fillText("▸ DOWNLOAD", rightPanelBaseX + 12, downloadPanelY + 15);
  ctx.shadowBlur = 0;
  
  const dlBarHeights = [25, 40, 30, 45, 35, 50];
  for (let i = 0; i < dlBarHeights.length; i++) {
    const gradient = ctx.createLinearGradient(0, downloadPanelY + 65, 0, downloadPanelY + 65 - dlBarHeights[i]);
    gradient.addColorStop(0, "rgba(0, 255, 157, 0.3)");
    gradient.addColorStop(1, "rgba(0, 255, 157, 0.9)");
    ctx.fillStyle = gradient;
    ctx.fillRect(rightPanelBaseX + 12 + i * 16, downloadPanelY + 65 - dlBarHeights[i], 10, dlBarHeights[i]);
  }

  const systemPanelX = uploadPanelX;
  
  ctx.shadowColor = "rgba(0, 247, 255, 0.3)";
  ctx.shadowBlur = 15;
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(systemPanelX, downloadPanelY, 120, latGraphH, 15);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  ctx.font = "700 11px Arial, sans-serif";
  ctx.fillStyle = "#00f7ff";
  ctx.shadowColor = "#00f7ff";
  ctx.shadowBlur = 5;
  ctx.fillText("▸ ESTADO DO", systemPanelX + 12, downloadPanelY + 12);
  ctx.fillText("  SISTEMA", systemPanelX + 12, downloadPanelY + 25);
  ctx.shadowBlur = 0;
  
  const systemMetrics = [
    { label: "CPU", value: config.cpu || "45", color: "#00f7ff" },
    { label: "RAM", value: config.ram || "62", color: "#00ff9d" },
    { label: "DISK", value: config.disk || "78", color: "#b400ff" }
  ];
  
  let metricY = downloadPanelY + 45;
  for (const metric of systemMetrics) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(systemPanelX + 12, metricY, 96, 4);
    
    const progress = Math.min(parseFloat(metric.value) / 100, 1);
    ctx.fillStyle = metric.color;
    ctx.fillRect(systemPanelX + 12, metricY, 96 * progress, 4);
    
    metricY += 10;
  }

  return canvas.toBuffer('image/png');
}

router.get('/ping', async (req, res) => {
  try {
    const config = {
      name: req.query.name || "NEEXT",
      avatar: req.query.avatar || null,
      wallpaper: req.query.wallpaper || null,
      datetime: req.query.datetime || null,
      speed: req.query.speed || "999",
      latency: req.query.latency || "2",
      pingMs: req.query.pingMs || "15",
      loss: req.query.loss || "0",
      upload: req.query.upload || "850",
      download: req.query.download || "950",
      cpu: req.query.cpu || "45",
      ram: req.query.ram || "62",
      disk: req.query.disk || "78",
      os: req.query.os || "LINUX",
      id: req.query.id || "0000000000",
      vip: req.query.vip || "PREMIUM",
      rank: req.query.rank || "#1"
    };

    const buffer = await drawBanner(config);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('Erro ao gerar ping banner:', err);
    res.status(500).send('Erro ao gerar ping banner');
  }
});

module.exports = router;