const { getArticles } = require('../models/articlesModels');

exports.sendArticles = (req, res, next) => {
  getArticles(req.query).then((articles) => {
    res.status(200).send({ articles });
  });
};
