const express = require('express');
const cors = require('cors');
const puppet = require('./puppet')

const corsOptions = {
  origin: 'http://localhost:8001',
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));

const port = 8001;
app.listen(port, () => {
  console.log(`ImageGenerator listening on port ${port}`)
})

app.get('/', (_req, res) => {
  res.send('Hello World!')
});

app.get('/welcome-image', puppet.generateImage);

