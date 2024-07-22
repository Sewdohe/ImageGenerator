const template = require('./welcome-template');
const puppeteer = require('puppeteer');
const fs = require('fs');

exports.generateImage = async function (req, res) {

  const { title, description, img } = await req.query;

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 353, height: 103 });
  await page.setContent(template.getHtml(title, description, img));
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
