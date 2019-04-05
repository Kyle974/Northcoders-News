const connection = require('../db/connection');

exports.getArticles = () => {
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
    .from('articles');
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
