const topicsRouter = require('express').Router();
const { sendTopics, addTopic } = require('../controllers/topicsControllers');

topicsRouter.route('/').get(sendTopics);

module.exports = topicsRouter;
