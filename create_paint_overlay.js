const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

(async () => {
  const tpl = await loadImage(path.join(__dirname, 'templates', 'paint_template.jpg'));
  const canvas = createCanvas(tpl.width, tpl.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(tpl, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width: w, height: h } = imageData;
  
  const visit = new Uint8Array(w * h);
  const idx = (x, y) => (y * w + x) << 2;
  const threshold = 240;
  const components = [];
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (visit[p]) continue;
      
      const i = idx(x, y);
      if (data[i] >= threshold && data[i + 1] >= threshold && data[i + 2] >= threshold) {
        const stack = [[x, y]];
        visit[p] = 1;
        const comp = [];
        
        while (stack.length) {
          const [cx, cy] = stack.pop();
          const cp = cy * w + cx;
          comp.push(cp);
          
          for (const [nx, ny] of [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]]) {
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            const np = ny * w + nx;
            if (visit[np]) continue;
            
            const ni = idx(nx, ny);
            if (data[ni] >= threshold && data[ni + 1] >= threshold && data[ni + 2] >= threshold) {
              visit[np] = 1;
              stack.push([nx, ny]);
            }
          }
        }
        components.push(comp);
      }
    }
  }
  
  const board = components.sort((a, b) => b.length - a.length)[0];
  const mask = new Uint8Array(w * h);
  for (const p of board) mask[p] = 1;
  
  const expand = new Uint8Array(mask);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (mask[y * w + x]) {
        for (let dy = -4; dy <= 4; dy++) {
          for (let dx = -4; dx <= 4; dx++) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < w && ny < h) {
              expand[ny * w + nx] = 1;
            }
          }
        }
      }
    }
  }
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (expand[y * w + x]) {
        data[idx(x, y) + 3] = 0;
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  fs.writeFileSync(path.join(__dirname, 'templates', 'paint_overlay.png'), canvas.toBuffer('image/png'));
  console.log('✓ Paint overlay criado');
})();
