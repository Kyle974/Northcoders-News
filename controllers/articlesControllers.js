const { getArticles, getArticleById } = require('../models/articlesModels');

exports.sendArticles = (req, res, next) => {
  return getArticles().then((articles) => res.status(200).send({ articles }));
};

exports.sendArticleById = (req, res, next) => {
  return getArticleById(req.params).then(([article]) => {
    res.status(200).send({ article });
    // .catch(next);
  });
};
