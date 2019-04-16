const usersRouter = require('express').Router();
const { sendUser } = require('../controllers/usersControllers');
const { methodNotAllowed, handle405 } = require('../errors/index');

usersRouter
  .route('/:username')
  .get(sendUser)
  .all(methodNotAllowed)
  .all(handle405);

module.exports = usersRouter;
