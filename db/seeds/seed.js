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
      const formattedArticlesData = reformatTimestamp(
        articlesData,
        'created_at'
      );
      return connection
        .insert(formattedArticlesData)
        .into('articles')
        .returning('*')
        .then(console.log(formattedArticlesData));
    })
    .then((formattedArticlesData) => {
      const formattedCommentsData = reformatTimestamp(
        commentsData,
        'created_at'
      );
      changeKeyName(formattedCommentsData, 'belongs_to', 'title');
      convertData(
        formattedCommentsData,
        'title',
        formattedArticlesData,
        'article_id'
      );
      changeKeyName(formattedCommentsData, 'created_by', 'author');
      return connection
        .insert(formattedCommentsData)
        .into('comments')
        .returning('*');
    });
};
