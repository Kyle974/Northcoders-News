const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const { methodNotAllowed } = require('../errors/index');

apiRouter.use('/users', usersRouter).all(methodNotAllowed);

apiRouter.use('/topics', topicsRouter).all(methodNotAllowed);

apiRouter.use('/articles', articlesRouter).all(methodNotAllowed);

apiRouter.use('/comments', commentsRouter).all(methodNotAllowed);

module.exports = apiRouter;
