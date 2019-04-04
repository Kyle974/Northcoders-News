const formatArticlesData = (articlesData) => {
  const formattedArticlesData = [];
  for (let i = 0; i < articlesData.length; i++) {
    const articleData = { ...articlesData[i] };
    articleData.created_at = new Date(articleData.created_at).toUTCString();
    formattedArticlesData.push(articleData);
  }
  return formattedArticlesData;
};

const formatCommentsData = (commentsData, articlesData) => {
  const formattedCommentsData = [];
  for (let i = 0; i < commentsData.length; i++) {
    const commentData = { ...commentsData[i] };
    commentData.author = commentData.created_by;
    commentData.created_at = new Date(commentData.created_at).toUTCString();
    formattedCommentsData.push(commentData);
    const matchedData = articlesData.find(
      (articleData) => articleData.title === commentData.belongs_to
    );
    delete commentData.belongs_to;
    delete commentData.created_by;
    commentData.article_id = matchedData.article_id;
  }
  return formattedCommentsData;
};

module.exports = {
  formatArticlesData,
  formatCommentsData,
};
