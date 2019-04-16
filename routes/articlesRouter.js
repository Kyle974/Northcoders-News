const articlesRouter = require('express').Router();
const {
  sendArticles,
  sendArticleById,
  upvoteArticleById,
  removeArticleById,
  sendCommentsByArticleId,
  addCommentByArticleId,
} = require('../controllers/articlesControllers');
const { methodNotAllowed, handle405 } = require('../errors/index');

articlesRouter
  .route('/')
  .get(sendArticles)
  .all(methodNotAllowed)
  .all(handle405);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(upvoteArticleById)
  .delete(removeArticleById)
  .all(methodNotAllowed)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments')
  .get(sendCommentsByArticleId)
  .post(addCommentByArticleId)
  .all(methodNotAllowed)
  .all(handle405);

module.exports = articlesRouter;
