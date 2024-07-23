const express = require('express');
const cors = require('cors');
const puppet = require('./puppet')
const axios = require('axios')
const path = require('path')

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use("/public", express.static(path.join(__dirname, "public")));

const port = 3876;
app.listen(port, () => {
  console.log(`ImageGenerator listening on port ${port}`)
})

app.get('/', (_req, res) => {
  res.send('Hello World!')
});

app.get('/welcome-image', puppet.generateHelloImage);
app.get('/goodbye-image', puppet.generateGoodbyeImage);
app.get('/server-status', puppet.generateStatusCard);

