const ENV = process.env.NODE_ENV || 'development';
const devData = require('./dev-data');
const testData = require('./test-data');

const data = {
  development: devData,
  test: testData,
  production: devData,
};

module.exports = data[ENV];
