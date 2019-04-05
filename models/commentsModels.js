const connection = require('../db/connection');

exports.patchComment = (body, params) => {
  const { comment_id } = params;
  const { inc_votes } = body;
  return connection
    .where('comment_id', '=', comment_id)
    .increment('votes', inc_votes)
    .from('comments')
    .returning('*');
};

exports.deleteCommentById = (params) => {
  const { comment_id } = params;
  return connection('comments')
    .where('comment_id', '=', comment_id)
    .del();
};
