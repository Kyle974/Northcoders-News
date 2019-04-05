const articlesRouter = require('express').Router();
const {
  sendArticles,
  sendArticleById,
  upvoteArticleById,
  removeArticleById,
  sendCommentsByArticleId,
  addCommentByArticleId,
} = require('../controllers/articlesControllers');

articlesRouter.route('/').get(sendArticles);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(upvoteArticleById)
  .delete(removeArticleById);

articlesRouter
  .route('/:article_id/comments')
  .get(sendCommentsByArticleId)
  .post(addCommentByArticleId);

module.exports = articlesRouter;
