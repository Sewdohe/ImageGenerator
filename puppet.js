const goodbye_template = require('./goodbye-template');
const hello_template = require('./welcome-template');
const statuscard_template = require('./statuscard-template');
const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');

exports.generateHelloImage = async function (req, res) {

  const { user, img } = await req.query;

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 353, height: 103 });
  await page.setContent(hello_template.getHtml(user, img));
  await page.evaluate(() => {
    document.body.style.background = 'transparent';
  })

  const image = await page.screenshot({ type: 'png', omitBackground: true });

  const imagePath = __dirname + `/public/images/${user}.png`;
  console.log('Path to generated image: ' + imagePath)
  console.log('attempting image write to the disk')
  fs.appendFile(imagePath, image, () => {
    console.log('wrote image to disk')
  })

  res.statusCode = 200;
  res.setHeader('Content-Type', `image/jpeg`);
  res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
  res.end(image);
};


exports.generateGoodbyeImage = async function (req, res) {

  const { user, img } = await req.query;

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 353, height: 103 });
  await page.setContent(goodbye_template.getHtml(user, img));
  await page.evaluate(() => {
    document.body.style.background = 'transparent';
  })

  const image = await page.screenshot({ type: 'png', omitBackground: true });

  const imagePath = __dirname + `/public/images/${title}.png`;
  console.log('Path to generated image: ' + imagePath)
  console.log('attempting image write to the disk')
  fs.appendFile(imagePath, image, () => {
    console.log('wrote image to disk')
  })

  res.statusCode = 200;
  res.setHeader('Content-Type', `image/jpeg`);
  res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
  res.end(image);
};


exports.generateStatusCard = async function (req, res) {
  const { uri } = await req.query;
  const req_uri = `https://api.mcstatus.io/v2/status/java/${uri}`
  console.log(`making request to ${req_uri}....`)
  const serverResponse = await axios.get(req_uri);

  const playerList = serverResponse.data.players.list


  const serverData = await Promise.all(
    playerList.map(async (player) => {
      const avatarResponse = await axios.get(`https://crafatar.com/avatars/${player.uuid}?size=100&overlay`);
      return {
        ...player,
        avatar: avatarResponse.config.url, // Get the URL from the request configuration
      };
    })
  );

  const host = serverResponse.data.host;
  const icon = serverResponse.data.icon;

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 500 });
  await page.setContent(statuscard_template.getHtml(serverData, host, icon));
  await page.evaluate(() => {
    document.body.style.background = 'transparent';
  })

  const image = await page.screenshot({ type: 'png', omitBackground: true });
  const fileName = 'status-' + Date.now().toString() + '.png';

  const writePath = __dirname + `/public/images/` + fileName;
  fs.appendFile(writePath, image, () => {
    console.log('wrote image to disk')
  })
  res.statusCode = 200;
  res.setHeader('Content-Type', `text/html`);
  res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
  res.send(`https://generator.divnectar.com` + `/public/images/${fileName}`);
}
