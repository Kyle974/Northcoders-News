const {
  topicsData,
  usersData,
  articlesData,
  commentsData,
} = require('../data');

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
    })
    .then(() => {
      return connection
        .insert(usersData)
        .into('users')
        .returning('*');
    });
};
