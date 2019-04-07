const topicsRouter = require('express').Router();
const { sendTopics } = require('../controllers/topicsControllers');
const { methodNotAllowed } = require('../errors/index');

topicsRouter.route('/').get(sendTopics);

topicsRouter.all('/', methodNotAllowed);

module.exports = topicsRouter;
