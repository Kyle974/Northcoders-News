const connection = require('../db/connection');

exports.getUsers = (query) => {
  return connection.select('*').from('users');
};
