const express = require('express');
const apiRouter = require('./routes/api');
const {
  routeNotFound,
  handle500,
  handle405,
  handle404,
  handle400,
  methodNotAllowed,
} = require('./errors/index');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app
  .use('/api', apiRouter)
  .all(methodNotAllowed)
  .all(routeNotFound);

app.use(handle400);

app.use(handle404);

app.use(handle500);

app.use(handle405);

app.all('/*', routeNotFound);

module.exports = app;
