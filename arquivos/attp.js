const express = require('express');
const router = express.Router();
const { createCanvas } = require('@napi-rs/canvas');
const GIFEncoder = require('gif-encoder-2');

router.get('/attp', async (req, res) => {
  const type = req.query.type;
  const texto = req.query.texto;

  if (!type) return res.status(400).json({ message: "Faltando o parâmetro type" });
  if (!texto) return res.status(400).json({ message: "Faltando o parâmetro texto" });

  const validTypes = [
    "attp", "attp1", "attp2", "attp3", "attp4", "attp5",
    "attp6", "attp7", "attp8", "attp9", "attp10", "attp11", "attp12"
  ];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Tipo inválido. Use 'attp' até 'attp12'." });
  }

  try {
    const width = 512;
    const height = 512;
    const encoder = new GIFEncoder(width, height);
    
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(100);
    encoder.setQuality(10);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const styles = {
      attp: () => {
        ctx.font = "bold 60px Arial";
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      },
      attp1: () => {
        ctx.font = "italic 50px 'Comic Sans MS'";
        ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      },
      attp2: () => {
        ctx.font = "bold 70px Impact";
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 5;
        ctx.strokeText(texto, width / 2, height / 2);
      },
      attp3: () => {
        ctx.font = "bold 50px Tahoma";
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
      },
      attp4: () => {
        ctx.font = "bold 60px Georgia";
        ctx.fillStyle = "cyan";
      },
      attp5: () => {
        ctx.font = "bold 60px Verdana";
        ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 40%)`;
      },
      attp6: () => {
        ctx.font = "bold 60px 'Courier New'";
        ctx.fillStyle = "lime";
      },
      attp7: () => {
        ctx.font = "bold 60px Helvetica";
        ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      },
      attp8: () => {
        ctx.font = "bold 60px 'Times New Roman'";
        ctx.fillStyle = "gold";
      },
      attp9: () => {
        ctx.font = "bold 70px Fantasy";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "white";
      },
      attp10: () => {
        ctx.font = "bold 80px Arial";
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1, "green");
        ctx.fillStyle = gradient;
      },
      attp11: () => {
        ctx.font = "bold 70px Sans-serif";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.strokeText(texto, width / 2, height / 2);
        ctx.fillStyle = "purple";
      },
      attp12: () => {
        ctx.font = "bold 70px Arial";
        ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
      }
    };

    const selectedStyle = styles[type];

    for (let i = 0; i < 10; i++) {
      ctx.clearRect(0, 0, width, height);
      selectedStyle();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(texto, width / 2, height / 2);
      encoder.addFrame(ctx);
    }

    encoder.finish();

    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(Buffer.from(encoder.out.getData()));
  } catch (error) {
    console.error("Erro ao gerar GIF ATTP:", error);
    res.status(500).json({ error: "Erro ao gerar GIF animado." });
  }
});

module.exports = router;
