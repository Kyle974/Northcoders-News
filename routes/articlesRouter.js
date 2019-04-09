const articlesRouter = require('express').Router();
const {
  sendArticles,
  sendArticleById,
  upvoteArticleById,
  removeArticleById,
  sendCommentsByArticleId,
  addCommentByArticleId,
} = require('../controllers/articlesControllers');
const {
  methodNotAllowed,
  handle500,
  handle404,
  handle400,
} = require('../errors/index');

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

articlesRouter.all('/', handle400);

articlesRouter.all('/', methodNotAllowed);

articlesRouter.all('/:article_id/comments', handle400);

module.exports = articlesRouter;
