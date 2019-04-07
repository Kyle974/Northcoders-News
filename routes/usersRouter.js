const usersRouter = require('express').Router();
const { sendUser } = require('../controllers/usersControllers');
const { methodNotAllowed } = require('../errors/index');

usersRouter.route('/:username').get(sendUser);

usersRouter.all('/:username', methodNotAllowed);

module.exports = usersRouter;
