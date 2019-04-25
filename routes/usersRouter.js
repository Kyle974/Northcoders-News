const usersRouter = require('express').Router();
const { sendUser } = require('../controllers/usersControllers');
const { methodNotAllowed } = require('../errors/index');

usersRouter
  .route('/:username')
  .get(sendUser)
  .all(methodNotAllowed);

module.exports = usersRouter;
