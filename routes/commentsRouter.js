const commentsRouter = require('express').Router();
const {
  upvoteCommentById,
  removeCommentById,
} = require('../controllers/commentsControllers');
const { methodNotAllowed } = require('../errors/index');

commentsRouter
  .route('/:comment_id')
  .patch(upvoteCommentById)
  .delete(removeCommentById);

commentsRouter.all('/:comment_id', methodNotAllowed);

module.exports = commentsRouter;
