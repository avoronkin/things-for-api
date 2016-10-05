/* eslint no-underscore-dangle: 0, consistent-return: 0 */
const assert = require('assert');
const httpMocks = require('node-mocks-http');
const version = require('../../lib').middlewares.version;

describe('version middleware', () => {
  it('should call next() if version matches', (done) => {
    const middleware = version();
    const req = httpMocks.createRequest({
      meta: {
        versions: '4',
      },
      query: {
        version: '4',
      },
    });
    const res = httpMocks.createResponse();

    middleware(req, res, (err) => {
      if (err) {
        if (err instanceof Error) return done(err);
      }

      assert.notEqual(err, 'router');
      done();
    });
  });

  it('should use default version from \'meta\' if version is not specified in request', (done) => {
    const middleware = version();
    const req = httpMocks.createRequest({
      meta: {
        versions: '4,5,6',
        defaultVersion: '4',
      },
    });
    const res = httpMocks.createResponse();

    middleware(req, res, (err) => {
      if (err) {
        if (err instanceof Error) return done(err);
      }

      assert.notEqual(err, 'router');
      assert.equal(req.version, '4');
      done();
    });
  });

  it('should use default version from middleware config if version is not specified in request', (done) => {
    const middleware = version('4,5,6', '6');
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    middleware(req, res, (err) => {
      if (err) {
        if (err instanceof Error) return done(err);
      }

      assert.notEqual(err, 'router');
      assert.equal(req.version, '6');
      done();
    });
  });

  it('should call next(\'route\') if version doesn\'t match', (done) => {
    const middleware = version();
    const req = httpMocks.createRequest({
      meta: {
        versions: '4',
      },
      query: {
        version: '5',
      },
    });
    const res = httpMocks.createResponse();

    middleware(req, res, (err) => {
      if (err && err instanceof Error) return done(err);

      assert.equal(err, 'router');
      done();
    });
  });
});
