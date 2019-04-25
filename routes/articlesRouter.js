const articlesRouter = require('express').Router();
const {
  sendArticles,
  sendArticleById,
  upvoteArticleById,
  removeArticleById,
  sendCommentsByArticleId,
  addCommentByArticleId,
} = require('../controllers/articlesControllers');
const { methodNotAllowed } = require('../errors/index');

articlesRouter
  .route('/')
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(upvoteArticleById)
  .delete(removeArticleById)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id/comments')
  .get(sendCommentsByArticleId)
  .post(addCommentByArticleId)
  .all(methodNotAllowed);

module.exports = articlesRouter;
