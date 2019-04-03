const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');
const { methodNotAllowed } = require('../errors');

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
