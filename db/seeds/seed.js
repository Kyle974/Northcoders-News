const {
  topicsData,
  usersData,
  articlesData,
  commentsData,
} = require('../data');

const {
  reformatTimestamp,
  changeKeyName,
  convertData,
} = require('../../utils/utils');

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
    })
    .then(() => {
      return connection
        .insert(reformatTimestamp(articlesData, 'created_at'))
        .into('articles')
        .returning('*');
    })
    .then(() => {
      const formattedCommentsData = reformatTimestamp(
        commentsData,
        'created_at'
      );
      changeKeyName(formattedCommentsData, 'belongs_to', 'title');
      convertData(formattedCommentsData, 'title', articlesData, 'article_id');
      return connection
        .insert(formattedCommentsData)
        .into('comments')
        .returning('*')
        .then(console.log(commentsData));
    });
};
