exports.methodNotAllowed = (err, req, res, next) => {
  console.log('405 block reached!');
  if (err.code === 405) {
    res.status(405).send({ msg: err.msg || 'Method Not Allowed' });
  }
};

exports.handle400 = (err, req, res, next) => {
  console.log(err.code);
  console.log('400 block reached!');
  const errorCodes = ['23502', '22P02', '42703'];
  if (errorCodes.includes(err.code)) {
    res.status(400).send({ msg: err.msg || 'Bad Request' });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  console.log('404 block reached!');
  if (err.code === 404) {
    res.status(404).send({ msg: err.msg || 'Not Found' });
  } else next(err);
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
