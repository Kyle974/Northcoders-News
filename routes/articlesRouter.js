const articlesRouter = require('express').Router();
const {
  sendArticles,
  addArticle,
} = require('../controllers/articlesControllers');

articlesRouter.route('/').get(sendArticles);

module.exports = articlesRouter;
