const express = require('express');
const musicardRoutes = require('./arquivos/musicard');
const musicard2 = require('./arquivos/musicard2');
const canvasfyRoutes = require('./arquivos/canvasfy');
const pingRoutes = require('./arquivos/ping');
const welcome2Routes = require('./arquivos/welcome2');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', musicardRoutes);
app.use('/', canvasfyRoutes);
app.use('/', musicard2);
app.use('/', pingRoutes);
app.use('/', welcome2Routes);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});