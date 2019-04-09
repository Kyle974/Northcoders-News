const express = require('express');
const apiRouter = require('./routes/api');
const {
  routeNotFound,
  handle500,
  handle404,
  handle400,
} = require('./errors/index');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(handle400);

app.use(handle404);

app.use(handle500);

app.all('/*', routeNotFound);

module.exports = app;
