/* eslint consistent-return:0 */
const boom = require('boom');
const Joi = require('joi');

module.exports = function configureValidateMiddlevare (validate) {
  return function validateMiddleware (req, res, next) {
    const validationSchema = validate || (req.meta && req.meta.validate);

    if (!validationSchema) return next();

    Joi.validate({
      query: req.query,
      path: req.params,
      body: req.body,
      headers: req.headers,
    }, validationSchema, {
      abortEarly: false,
      allowUnknown: true,
    }, (err) => {
      if (!err) return next();

      const errorDescription = err.details.map((detail) => {
        if (detail.path.indexOf('query.') > -1) {
          return `Get parameter ${detail.message}.`;
        } else if (detail.path.indexOf('body.') > -1) {
          return `Post parameter ${detail.message}.`;
        } else if (detail.path.indexOf('params.') > -1) {
          return `Url parameter ${detail.message}.`;
        } else if (detail.path.indexOf('headers.') > -1) {
          return `Header ${detail.message}.`;
        }
        return `${detail.message}.`;
      }).join(' ');

      next(boom.badRequest(errorDescription));
    });
  };
};
