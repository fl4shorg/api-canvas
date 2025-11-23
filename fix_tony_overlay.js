const { Jimp } = require('jimp');
const path = require('path');

async function fixTony() {
  const img = await Jimp.read(path.join(__dirname, 'templates', 'tonyquadro_template.jpg'));
  
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    if (r === 255 && g === 255 && b === 255) {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  
  await img.write(path.join(__dirname, 'templates', 'tonyquadro_overlay.png'));
  console.log('✅ Overlay pronto!');
}

fixTony().catch(console.error);
