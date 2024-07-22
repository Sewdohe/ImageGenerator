const template = require('./welcome-template');
const puppeteer = require('puppeteer');
const fs = require('fs');

exports.generateImage = async function (req, res) {

  const { title, description, img } = await req.query;

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 630 });

  await page.setContent(template.getHtml(title, description, img));

  const image = await page.screenshot({ type: 'jpeg' });

  const imagePath = __dirname + `/public/images/${title}.jpeg`;
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
