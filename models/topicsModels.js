const connection = require('../db/connection');

exports.getTopics = (query) => {
  return connection.select('*').from('topics');
};
