const { getTopics } = require('../models/topicsModels');

exports.sendTopics = (req, res, next) => {
  getTopics(req.query).then((topics) => {
    res.status(200).send({ topics });
  });
};
