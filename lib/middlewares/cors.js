const _ = require('lodash');

module.exports = function configureCorsMiddleware (options) {
  const origin = _.get(options, 'origin', '*');
  const methods = _.get(options, 'methods', 'GET,PUT,POST,DELETE');
  const headers = _.get(options, 'headers', 'Content-Type');

  return function corsMiddleware (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', methods);
    res.setHeader('Access-Control-Allow-Headers', headers);

    next();
  };
};
