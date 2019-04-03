const connection = require('../db/connection');

exports.getArticles = (query) => {
  return connection.select('*').from('articles');
};
