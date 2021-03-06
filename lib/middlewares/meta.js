/* eslint no-param-reassign: 0 */
module.exports = function configureMetaMiddleware (config) {
  function metaMiddleware (req, res, next) {
    req.meta = config;
    next();
  }

  metaMiddleware.isMeta = true;
  metaMiddleware.config = config;

  return metaMiddleware;
};
