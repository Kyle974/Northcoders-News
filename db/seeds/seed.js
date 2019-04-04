const {
  topicsData,
  usersData,
  articlesData,
  commentsData,
} = require('../data');

const { formatCommentsData, formatArticlesData } = require('../../utils/utils');

exports.seed = (connection, Promise) => {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
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
      const formattedArticlesData = formatArticlesData(articlesData);
      return connection
        .insert(formattedArticlesData)
        .into('articles')
        .returning('*');
    })
    .then((formattedArticlesData) => {
      const formattedCommentsData = formatCommentsData(
        commentsData,
        formattedArticlesData
      );
      return connection
        .insert(formattedCommentsData)
        .into('comments')
        .returning('*');
    });
};
