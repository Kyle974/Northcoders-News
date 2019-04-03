const { getComments } = require('../models/commentsModels');

exports.sendComments = (req, res, next) => {
  getComments(req.query).then((comments) => {
    res.status(200).send({ comments });
  });
};
