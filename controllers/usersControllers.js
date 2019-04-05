const { getUser } = require('../models/usersModels');

exports.sendUser = (req, res, next) => {
  getUser(req.params).then(([user]) => {
    res.status(200).send({ user });
  });
};
