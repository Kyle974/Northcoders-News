const { patchComment, deleteCommentById } = require('../models/commentsModels');

exports.upvoteCommentById = (req, res, next) => {
  return patchComment(req.body, req.params).then(([comment]) => {
    res.status(200).send({ comment });
  });
};

exports.removeCommentById = (req, res, next) => {
  return deleteCommentById(req.params).then(() => {
    res.status(204).send(`Comment ${req.params.article_id} deleted.`);
  });
};
