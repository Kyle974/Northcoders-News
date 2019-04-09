exports.handle400 = (err, req, res, next) => {
  console.log(err.code);
  const errorCodes = ['23502', '22P02', '42703'];
  if (errorCodes.includes(err.code)) {
    console.log();
    res.status(400).send({ msg: err.msg || 'Bad Request' });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).send({ msg: err.msg || 'Not Found' });
  } else next(err);
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
