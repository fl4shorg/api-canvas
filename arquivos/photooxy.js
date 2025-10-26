const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const router = express.Router();

let browserInstance = null;

async function getBrowser() {
    if (!browserInstance || !browserInstance.isConnected()) {
        browserInstance = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-blink-features=AutomationControlled',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process'
            ],
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
        });
    }
    return browserInstance;
}

async function generatePhotoOxy(url, textArray) {
    let page;
    try {
        const browser = await getBrowser();
        page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });
        
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        });

        console.log(`[PhotoOxy] Navegando para: ${url}`);
        await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 60000 
        });

        await page.waitForTimeout(2000);

        const tokenExists = await page.$('input[name="token"]');
        if (!tokenExists) {
            throw new Error('Token não encontrado na página');
        }

        console.log('[PhotoOxy] Preenchendo formulário...');
        const textInputs = await page.$$('input[name="text[]"]');
        
        if (textInputs.length === 0) {
            throw new Error('Campos de texto não encontrados');
        }

        for (let i = 0; i < Math.min(textArray.length, textInputs.length); i++) {
            await textInputs[i].click({ delay: 100 });
            await textInputs[i].type(textArray[i], { delay: 50 });
        }

        await page.waitForTimeout(1000);

        console.log('[PhotoOxy] Submetendo formulário...');
        const submitButton = await page.$('button[type="submit"], input[type="submit"], button:has-text("Go")');
        
        if (submitButton) {
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
                submitButton.click()
            ]);
        } else {
            await page.evaluate(() => {
                const form = document.querySelector('form');
                if (form) form.submit();
            });
            await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });
        }

        console.log('[PhotoOxy] Aguardando geração da imagem...');
        await page.waitForTimeout(3000);

        const imageUrl = await page.evaluate(() => {
            const img = document.querySelector('img[id*="image"], img.image-result, div.image-result img, #form_value_image');
            if (img) return img.src;
            
            const links = document.querySelectorAll('a[href*=".jpg"], a[href*=".png"]');
            if (links.length > 0) return links[0].href;
            
            const formValue = document.querySelector('#form_value');
            if (formValue) {
                try {
                    const data = JSON.parse(formValue.textContent);
                    if (data.image) return `https://e2.yotools.net/${data.image}`;
                } catch (e) {}
            }
            
            return null;
        });

        if (!imageUrl) {
            const pageContent = await page.content();
            console.log('[PhotoOxy] Página resultante (primeiros 1000 chars):', pageContent.substring(0, 1000));
            throw new Error('URL da imagem não encontrada na página resultante');
        }

        console.log(`[PhotoOxy] Imagem encontrada: ${imageUrl}`);

        const imagePage = await browser.newPage();
        const response = await imagePage.goto(imageUrl, { waitUntil: 'networkidle2' });
        const buffer = await response.buffer();
        
        await imagePage.close();
        await page.close();

        return buffer;

    } catch (error) {
        if (page) await page.close().catch(() => {});
        throw error;
    }
}

router.get('/photooxy', async (req, res) => {
    try {
        const { url, text } = req.query;
        
        if (!url || !text) {
            return res.status(400).json({ 
                error: 'Parâmetros necessários: url e text',
                exemplo: '/photooxy?url=https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html&text=NEEXT',
                nota: 'Use vírgula para múltiplas linhas de texto: text=Linha1,Linha2',
                parametros: {
                    url: 'URL completa do efeito no photooxy.com',
                    text: 'Texto para aplicar no efeito (string ou separado por vírgula)'
                }
            });
        }

        if (!url.includes('photooxy.com')) {
            return res.status(400).json({ 
                error: 'URL deve ser do photooxy.com',
                exemplo: 'https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html'
            });
        }

        const textArray = Array.isArray(text) ? text : text.split(',').map(t => t.trim());

        console.log(`[PhotoOxy API] Iniciando geração - URL: ${url}, Textos: ${textArray.join(', ')}`);
        
        const imageBuffer = await generatePhotoOxy(url, textArray);
        
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.send(imageBuffer);
        
        console.log('[PhotoOxy API] Imagem enviada com sucesso!');

    } catch (err) {
        console.error('[PhotoOxy API] Erro:', err.message);
        res.status(500).json({ 
            error: 'Erro ao gerar imagem via photooxy.com',
            detalhes: err.message,
            dica: 'Verifique se a URL do efeito está correta e se o site photooxy.com está acessível'
        });
    }
});

process.on('exit', async () => {
    if (browserInstance) {
        await browserInstance.close();
    }
});

module.exports = router;
