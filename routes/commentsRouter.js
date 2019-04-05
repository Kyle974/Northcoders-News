const commentsRouter = require('express').Router();
const {
  upvoteCommentById,
  removeCommentById,
} = require('../controllers/commentsControllers');

commentsRouter
  .route('/:comment_id')
  .patch(upvoteCommentById)
  .delete(removeCommentById);

module.exports = commentsRouter;
