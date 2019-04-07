exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle404 = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).send({ msg: err.msg || 'Not found' });
  } else next(err);
};

exports.handle400 = (err, req, res, next) => {
  const codes = ['23502'];
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
