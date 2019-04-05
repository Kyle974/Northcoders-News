const articlesRouter = require('express').Router();
const {
  sendArticles,
  sendArticleById,
  upvoteArticleById,
  removeArticleById,
} = require('../controllers/articlesControllers');

articlesRouter.route('/').get(sendArticles);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(upvoteArticleById)
  .delete(removeArticleById);

module.exports = articlesRouter;
