const express = require('express');
const { Classic, ClassicPro, Dynamic, Mini, Upcoming } = require('musicard');
const router = express.Router();

// Função genérica para gerar cards (Classic, ClassicPro, Dynamic, Mini)
async function generateCard(params, ThemeClass) {
    const { title, artist, cover, wallpaper, progress, startTime, endTime } = params;

    if (!title) throw new Error("O parâmetro 'title' é obrigatório.");

    const card = await ThemeClass({
        title,
        author: artist || "Artista Desconhecido",
        thumbnailImage: cover || null,
        backgroundImage: wallpaper || null,
        nameColor: "#FFFFFF", // cor padrão da biblioteca
        progress: parseInt(progress) || 0,
        startTime: startTime || "0:00",
        endTime: endTime || "0:00",
        imageDarkness: 50 // padrão da biblioteca
    });

    return card;
}

// Função para Upcoming
async function generateUpcoming(params) {
    const { title, artist, cover, wallpaper } = params;

    if (!title) throw new Error("O parâmetro 'title' é obrigatório.");

    const card = await Upcoming({
        title,
        author: artist || "Artista Desconhecido",
        thumbnailImage: cover || null,
        backgroundImage: wallpaper || null,
        nameColor: "#FFFFFF", // cor padrão
        imageDarkness: 50,
        trackIndexBackgroundRadii: [10,20,30,40,50,60,70,80,80,100] // padrão GitHub
    });

    return card;
}

// Rotas para cada tema
router.get('/musicard2/classic', async (req, res) => {
    try {
        const buffer = await generateCard(req.query, Classic);
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao gerar Classic card");
    }
});

router.get('/musicard2/classicpro', async (req, res) => {
    try {
        const buffer = await generateCard(req.query, ClassicPro);
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao gerar ClassicPro card");
    }
});

router.get('/musicard2/dynamic', async (req, res) => {
    try {
        const buffer = await generateCard(req.query, Dynamic);
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao gerar Dynamic card");
    }
});

router.get('/musicard2/mini', async (req, res) => {
    try {
        const buffer = await generateCard(req.query, Mini);
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao gerar Mini card");
    }
});

// Upcoming
router.get('/musicard2/upcoming', async (req, res) => {
    try {
        const buffer = await generateUpcoming(req.query);
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao gerar Upcoming card");
    }
});

module.exports = router;