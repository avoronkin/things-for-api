/* eslint no-param-reassign: 0, consistent-return: 0 */
module.exports = function configureVersionMiddleware (supportedVersions, defaultVersion) {
  return function versionMiddleware (req, res, next) {
    const versions = supportedVersions || (req.meta && req.meta.versions);

    if (!versions) return next();

    const version = req.version = (req.params.version || req.query.version) ||
    (defaultVersion || req.meta.defaultVersion);

    if ((versions).split(',').indexOf(version) !== -1) {
      next();
    } else {
      next('router');
    }
  };
};
