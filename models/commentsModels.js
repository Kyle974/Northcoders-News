const connection = require('../db/connection');

exports.getComments = (query) => {
  return connection.select('*').from('comments');
};
