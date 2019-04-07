const {
  getArticles,
  getArticleById,
  patchArticleById,
  deleteArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require('../models/articlesModels');

exports.sendArticles = (req, res, next) => {
  return getArticles(req.query).then((articles) =>
    res.status(200).send({ articles })
  );
};

exports.sendArticleById = (req, res, next) => {
  return getArticleById(req.params)
    .then(([article]) => {
      if (article === undefined)
        return Promise.reject({ code: 404, msg: 'Article not found' });
      else res.status(200).send({ article });
    })
    .catch(next);
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

exports.sendCommentsByArticleId = (req, res, next) => {
  return getCommentsByArticleId(req.query, req.params)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addCommentByArticleId = (req, res, next) => {
  return postCommentByArticleId(req.body, req.params)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
