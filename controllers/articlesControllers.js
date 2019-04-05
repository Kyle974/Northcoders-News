const {
  getArticles,
  getArticleById,
  patchArticleById,
  deleteArticleById,
} = require('../models/articlesModels');

exports.sendArticles = (req, res, next) => {
  return getArticles().then((articles) => res.status(200).send({ articles }));
};

exports.sendArticleById = (req, res, next) => {
  return getArticleById(req.params).then(([article]) => {
    res.status(200).send({ article });
    // .catch(next);
  });
};

exports.upvoteArticleById = (req, res, next) => {
  return patchArticleById(req.body, req.params).then(([article]) => {
    res.status(200).send({ article });
  });
};

exports.removeArticleById = (req, res, next) => {
  return deleteArticleById(req.params)
    .then(() => {
      res.status(204).send(`Article ${req.params.article_id} deleted.`);
    })
    .catch((err) => console.log(err));
};
