const connection = require('../db/connection');

exports.getArticles = (query) => {
  const { article_id } = query;
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
      if (article_id) {
        articleQuery.where('article_id', '=', article_id);
      }
    });
};
