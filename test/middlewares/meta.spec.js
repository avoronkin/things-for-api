/* eslint consistent-return: 0 */
const assert = require('assert');
const meta = require('../../lib').middlewares.meta;
const httpMocks = require('node-mocks-http');

describe('meta middleware', () => {
  it('should set key \'meta\' for request object', (done) => {
    const conf = {
      key: 'value',
    };
    const middleware = meta(conf);
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    middleware(req, res, (err) => {
      if (err) return done(err);

      assert.deepEqual(conf, req.meta);

      done();
    });
  });

  it('must have property \'isMeta\'', () => {
    const middleware = meta();
    assert(middleware.isMeta);
  });
});
