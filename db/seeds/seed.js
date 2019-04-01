const { topicsData } = require('../data');

exports.seed = (connection, Promise) => {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      console.log('inserting data...');
      return connection
        .insert(topicsData)
        .into('topics')
        .returning('*');
    });
};
