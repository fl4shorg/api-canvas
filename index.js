const express = require('express');
const musicardRoutes = require('./arquivos/musicard');
const musicard2 = require('./arquivos/musicard2');
const canvasfyRoutes = require('./arquivos/canvasfy');
const pingRoutes = require('./arquivos/ping');
const ping2Routes = require('./arquivos/ping2');
const welcome2Routes = require('./arquivos/welcome2');
const musifyRoutes = require('./arquivos/musify');
const attpRoutes = require('./arquivos/attp');
const bolsonaroRoutes = require('./arquivos/bolsonaro');
const tonyquadroRoutes = require('./arquivos/tonyquadro');
const paintRoutes = require('./arquivos/paint');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Canvas API Server',
        endpoints: [
            '/musicard',
            '/musicard2',
            '/canvasfy',
            '/ping',
            '/ping2',
            '/welcome2',
            '/musify',
            '/attp',
            '/bolsonaro',
            '/tonyquadro',
            '/paint'
        ]
    });
});

app.use('/', musicardRoutes);
app.use('/', canvasfyRoutes);
app.use('/', musicard2);
app.use('/', pingRoutes);
app.use('/', ping2Routes);
app.use('/', welcome2Routes);
app.use('/', musifyRoutes);
app.use('/', attpRoutes);
app.use('/', bolsonaroRoutes);
app.use('/', tonyquadroRoutes);
app.use('/', paintRoutes);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});