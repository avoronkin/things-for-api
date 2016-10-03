/* eslint no-param-reassign: 0 */
const url = require('url');

module.exports = function configureQueryParserMiddleware () {
  return function queryParserMiddleware (req, res, next) {
    const parsedUrl = url.parse(req.url, true);

    req.query = parsedUrl.query;

    next();
  };
};
