const express = require('express');
const cors = require('cors');
const puppet = require('./puppet')

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.static('public'))

const port = 3876;
app.listen(port, () => {
  console.log(`ImageGenerator listening on port ${port}`)
})

app.get('/', (_req, res) => {
  res.send('Hello World!')
});

app.get('/welcome-image', puppet.generateImage);

