const express = require('express');
const LimitingMiddleware = require('limiting-middleware');
const { randomJoke, randomTen, jokeByType } = require('./handler');

const app = express();

app.use(new LimitingMiddleware().limitByIp());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/jokes/:type/random', (req, res) => {
  res.json(jokeByType(req.params.type, 1));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
