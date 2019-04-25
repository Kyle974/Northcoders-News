const {
  getArticles,
  getArticleById,
  patchArticleById,
  deleteArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require('../models/articlesModels');

exports.sendArticles = (req, res, next) => {
  return getArticles(req.query)
    .then((articles) => {
      articles;
      if (articles.length === 0) {
        return Promise.reject({
          code: 404,
          msg: 'Articles Not Found',
        });
      }
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  return getArticleById(req.params)
    .then(([article]) => {
      if (article === undefined)
        return Promise.reject({ code: 404, msg: 'Article Not Found' });
      else res.status(200).send({ article });
    })
    .catch(next);
};

exports.upvoteArticleById = (req, res, next) => {
  return patchArticleById(req.body, req.params)
    .then(([article]) => {
      if (
        Object.keys(req.body).length !== 1 ||
        req.body.inc_votes === undefined
      ) {
        return Promise.reject({ code: 405, msg: 'Method Not Allowed' });
      }
      if (article === undefined)
        return Promise.reject({ code: 404, msg: 'Article Not Found' });
      else res.status(200).send({ article });
    })
    .catch(next);
};

exports.removeArticleById = (req, res, next) => {
  return getArticleById(req.params)
    .then(([article]) => {
      if (article === undefined)
        return Promise.reject({ code: 404, msg: 'Article Not Found' });
      else
        return deleteArticleById(req.params).then(() => {
          res.status(204).send();
        });
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  return getArticleById(req.params)
    .then(([article]) => {
      if (article === undefined)
        return Promise.reject({ code: 404, msg: 'Article Not Found' });
      else
        return getCommentsByArticleId(req.query, req.params).then(
          (comments) => {
            res.status(200).send({ comments });
          }
        );
    })
    .catch(next);
};

exports.addCommentByArticleId = (req, res, next) => {
  return getArticleById(req.params)
    .then(([article]) => {
      if (article === undefined)
        return Promise.reject({ code: 404, msg: 'Article Not Found' });
      else
        return postCommentByArticleId(req.body, req.params).then(
          ([comment]) => {
            res.status(201).send({ comment });
          }
        );
    })
    .catch(next);
};
