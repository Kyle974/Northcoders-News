const articlesRouter = require('express').Router();
const { sendArticles } = require('../controllers/articlesControllers');

articlesRouter.route('/').get(sendArticles);

articlesRouter.route('/:article_id').get(sendArticles);

module.exports = articlesRouter;
