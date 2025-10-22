const express = require('express');
const router = express.Router();
const knights = require('knights-canvas');

router.get('/knights/welcome', async (req, res) => {
  try {
    const {
      username = "UNDEFINED",
      guildName = "Servidor",
      guildIcon = "https://i.pravatar.cc/150?img=1",
      memberCount = "1",
      avatar = "https://i.pravatar.cc/300?img=2",
      background = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
    } = req.query;

    const image = await new knights.Welcome()
      .setUsername(username)
      .setGuildName(guildName)
      .setGuildIcon(guildIcon)
      .setMemberCount(memberCount)
      .setAvatar(avatar)
      .setBackground(background)
      .toAttachment();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights welcome error', err);
    res.status(500).send('Erro ao gerar imagem de boas-vindas');
  }
});

router.get('/knights/welcome2', async (req, res) => {
  try {
    const {
      avatar = "https://i.pravatar.cc/300?img=3",
      username = "Usuário",
      background = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
      groupname = "Servidor",
      member = "1"
    } = req.query;

    const image = await new knights.Welcome2()
      .setAvatar(avatar)
      .setUsername(username)
      .setBg(background)
      .setGroupname(groupname)
      .setMember(member)
      .toAttachment();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights welcome2 error', err);
    res.status(500).send('Erro ao gerar imagem de boas-vindas 2');
  }
});

router.get('/knights/goodbye', async (req, res) => {
  try {
    const {
      username = "UNDEFINED",
      guildName = "Servidor",
      guildIcon = "https://i.pravatar.cc/150?img=4",
      memberCount = "1",
      avatar = "https://i.pravatar.cc/300?img=5",
      background = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
    } = req.query;

    const image = await new knights.Goodbye()
      .setUsername(username)
      .setGuildName(guildName)
      .setGuildIcon(guildIcon)
      .setMemberCount(memberCount)
      .setAvatar(avatar)
      .setBackground(background)
      .toAttachment();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights goodbye error', err);
    res.status(500).send('Erro ao gerar imagem de despedida');
  }
});

router.get('/knights/rank', async (req, res) => {
  try {
    const {
      avatar = "https://i.pravatar.cc/300?img=6",
      username = "Usuário",
      background = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
      needxp = "1000",
      currxp = "100",
      level = "1",
      rank = "https://i.ibb.co/Wn9cvnv/FABLED.png"
    } = req.query;

    const image = await new knights.Rank()
      .setAvatar(avatar)
      .setUsername(username)
      .setBg(background)
      .setNeedxp(needxp)
      .setCurrxp(currxp)
      .setLevel(level)
      .setRank(rank)
      .toAttachment();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights rank error', err);
    res.status(500).send('Erro ao gerar imagem de rank');
  }
});

router.get('/knights/levelup', async (req, res) => {
  try {
    const {
      avatar = "https://i.pravatar.cc/300?img=7"
    } = req.query;

    const image = await new knights.Up()
      .setAvatar(avatar)
      .toAttachment();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights levelup error', err);
    res.status(500).send('Erro ao gerar imagem de level up');
  }
});

router.get('/knights/horny', async (req, res) => {
  try {
    const {
      avatar = "https://i.pravatar.cc/300?img=8"
    } = req.query;

    const image = await new knights.Horny()
      .setAvatar(avatar)
      .toBuild();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights horny error', err);
    res.status(500).send('Erro ao gerar imagem horny');
  }
});

router.get('/knights/jojo', async (req, res) => {
  try {
    const {
      image = "https://i.pravatar.cc/300?img=9"
    } = req.query;

    const img = await new knights.Jo()
      .setImage(image)
      .toBuild();

    const data = img.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights jojo error', err);
    res.status(500).send('Erro ao gerar imagem jojo');
  }
});

router.get('/knights/patrick', async (req, res) => {
  try {
    const {
      avatar = "https://i.pravatar.cc/300?img=10"
    } = req.query;

    const image = await new knights.Patrick()
      .setAvatar(avatar)
      .toAttachment();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights patrick error', err);
    res.status(500).send('Erro ao gerar imagem patrick');
  }
});

router.get('/knights/bonk', async (req, res) => {
  try {
    const {
      avatar1 = "https://i.pravatar.cc/300?img=11",
      avatar2 = "https://i.pravatar.cc/300?img=12"
    } = req.query;

    const image = await new knights.Bonk()
      .setAvatar1(avatar1)
      .setAvatar2(avatar2)
      .toBuild();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights bonk error', err);
    res.status(500).send('Erro ao gerar imagem bonk');
  }
});

router.get('/knights/burn', async (req, res) => {
  try {
    const {
      avatar = "https://i.pravatar.cc/300?img=13"
    } = req.query;

    const image = await new knights.Burn()
      .setAvatar(avatar)
      .toAttachment();

    const data = image.toBuffer();
    res.set('Content-Type', 'image/png');
    res.send(data);
  } catch (err) {
    console.error('knights burn error', err);
    res.status(500).send('Erro ao gerar imagem burn');
  }
});

module.exports = router;
