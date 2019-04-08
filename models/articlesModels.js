const connection = require('../db/connection');

exports.getArticles = (query) => {
  const { author, topic } = query;
  const sort_by = query.sort_by || 'created_at';
  const order = query.order || 'desc';
  return connection('articles')
    .modify((articleQuery) => {
      if (author) {
        articleQuery.where({ author });
      }
      if (topic) {
        articleQuery.where({ topic });
      }
    })
    .orderBy(sort_by, order)
    .returning('*');
};

exports.getArticleById = (params) => {
  const { article_id } = params;
  return connection('articles')
    .modify((articleParam) => {
      if (article_id) {
        articleParam.where('article_id', '=', article_id);
      }
    })
    .returning('*');
};

exports.patchArticleById = (body, params) => {
  const { inc_votes } = body;
  const { article_id } = params;
  return connection('articles')
    .where('article_id', '=', article_id)
    .increment('votes', inc_votes)
    .returning('*');
};

exports.deleteArticleById = (params) => {
  const { article_id } = params;
  return connection('articles')
    .where('article_id', '=', article_id)
    .del();
};

exports.getCommentsByArticleId = (query, params) => {
  const { article_id } = params;
  const sort_by = query.sort_by || 'created_at';
  const order = query.order || 'desc';
  return connection('comments')
    .where('article_id', '=', article_id)
    .orderBy(sort_by, order)
    .returning('*');
};

exports.postCommentByArticleId = (body, params) => {
  return connection('comments')
    .insert({
      body: body.body,
      author: body.author,
      article_id: params.article_id,
    })
    .returning('*');
};
