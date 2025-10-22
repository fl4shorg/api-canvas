const express = require('express');
const musicardRoutes = require('./arquivos/musicard');
const musicard2 = require('./arquivos/musicard2');    // novo musicard2
const canvasfyRoutes = require('./arquivos/canvasfy');




const app = express();
const PORT = 3000;

app.use('/', musicardRoutes); // Todas as rotas do musicard.js
app.use('/', canvasfyRoutes);
app.use('/', musicard2);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});