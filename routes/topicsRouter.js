const topicsRouter = require('express').Router();
const { sendTopics } = require('../controllers/topicsControllers');
const { methodNotAllowed, handle405 } = require('../errors/index');

topicsRouter
  .route('/')
  .get(sendTopics)
  .all(methodNotAllowed)
  .all(handle405);

module.exports = topicsRouter;
