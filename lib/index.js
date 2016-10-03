const cors = require('./middlewares/cors');
const error404 = require('./middlewares/error404');
const errorHandler = require('./middlewares/errorHandler');
const meta = require('./middlewares/meta');
const queryParser = require('./middlewares/queryParser');
const validate = require('./middlewares/validate');
const version = require('./middlewares/version');

module.exports = {
  middlewares: {
    cors,
    error404,
    errorHandler,
    meta,
    queryParser,
    validate,
    version,
  },
};
