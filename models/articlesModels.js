const connection = require('../db/connection');

exports.getArticles = (query) => {
  const { author, topic } = query;
  const sortBy = query.sortBy || 'created_at';
  const sortDirection = query.order || 'desc';

  return connection
    .select(
      'article_id',
      'title',
      'body',
      'votes',
      'topic',
      'author',
      'created_at'
    )
    .from('articles')
    .modify((articleQuery) => {
      if (author) {
        articleQuery.where({ author });
      }
      if (topic) {
        articleQuery.where({ topic });
      }
    })
    .orderBy(sortBy, sortDirection);
};

exports.getArticleById = (params) => {
  const { article_id } = params;
  return connection
    .select(
      'article_id',
      'title',
      'body',
      'votes',
      'topic',
      'author',
      'created_at'
    )
    .from('articles')
    .modify((articleParam) => {
      if (article_id) {
        articleParam.where('article_id', '=', article_id);
      }
    });
};

exports.patchArticleById = (body, params) => {
  const { inc_votes } = body;
  const { article_id } = params;
  return connection
    .where('article_id', '=', article_id)
    .increment('votes', inc_votes)
    .from('articles')
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
  return connection
    .select('*')
    .from('comments')
    .where('article_id', '=', article_id)
    .orderBy(sort_by, order);
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
