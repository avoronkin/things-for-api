/* eslint no-console:0, no-param-reassign:0*/
const _ = require('lodash');
const boom = require('boom');

module.exports = function configureErrorHandlerMiddleware () {
  return function errorHandlerMiddleware (err, req, res) {
    if (!err.isBoom) {
      console.error(err);
      console.error(err.stack);

      err = boom.badImplementation('Internal Server Error');
    }

    res.status(_.get(err, 'output.payload.statusCode', 500));
    res.json({
      error: _.get(err, 'output.payload.error'),
      message: _.get(err, 'output.payload.message'),
    });
  };
};
