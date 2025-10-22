const express = require('express');
const { musicCard } = require('musicard-quartz');

const router = express.Router();

// Função genérica para gerar card
async function generateCard(params, theme) {
  const { title, artist, cover, wallpaper, color, minutes, seconds } = params;

  if (!title) throw new Error("O parâmetro 'title' é obrigatório.");

  // Converter minutos e segundos
  const min = parseInt(minutes) || 0;
  const sec = parseInt(seconds) || 0;

  // Criar o card
  const card = new musicCard()
    .setName(title)
    .setAuthor(artist || "Artista Desconhecido")
    .setColor(color || "auto")
    .setTheme(theme)
    .setStartTime("0:00") // início sempre 0
    .setEndTime(`${min}:${sec.toString().padStart(2, '0')}`); // fim dinâmico

  // Capa da música
  if (cover) card.setThumbnail(cover);

  // Wallpaper se disponível
  if (wallpaper && typeof card.setBackground === "function") {
    card.setBackground(wallpaper);
  }

  // Gera imagem como buffer
  const buffer = await card.build();
  return buffer;
}

// 🔵 Quartz+
router.get('/musicard/quartz', async (req, res) => {
  try {
    const buffer = await generateCard(req.query, "quartz+");
    res.setHeader('Content-Type', 'image/png');
    res.end(buffer);
  } catch (err) {
    console.error("Erro Quartz+:", err);
    res.status(500).send("Erro ao gerar Quartz+ card");
  }
});

// 🟠 OnePiece+
router.get('/musicard/onepiece', async (req, res) => {
  try {
    const buffer = await generateCard(req.query, "onepiece+");
    res.setHeader('Content-Type', 'image/png');
    res.end(buffer);
  } catch (err) {
    console.error("Erro OnePiece+:", err);
    res.status(500).send("Erro ao gerar OnePiece+ card");
  }
});

// 🟣 Vector+
router.get('/musicard/vector', async (req, res) => {
  try {
    const buffer = await generateCard(req.query, "vector+");
    res.setHeader('Content-Type', 'image/png');
    res.end(buffer);
  } catch (err) {
    console.error("Erro Vector+:", err);
    res.status(500).send("Erro ao gerar Vector+ card");
  }
});

module.exports = router;