const commentsRouter = require('express').Router();
const {
  sendComments,
  addComment,
} = require('../controllers/commentsControllers');

commentsRouter.route('/').get(sendComments);

module.exports = commentsRouter;
