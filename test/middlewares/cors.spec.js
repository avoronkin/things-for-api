/* eslint no-underscore-dangle: 0, consistent-return: 0 */
const assert = require('assert');
const cors = require('../../lib').middlewares.cors;
const httpMocks = require('node-mocks-http');

describe('cors middleware', () => {
  it('should set Access-Control-Allow-* headers', (done) => {
    const middleware = cors();
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    middleware(req, res, (err) => {
      if (err) return done(err);

      assert.equal(res.getHeader('Access-Control-Allow-Origin'), '*');
      assert.equal(res.getHeader('Access-Control-Allow-Methods'), 'GET,PUT,POST,DELETE');
      assert.equal(res.getHeader('Access-Control-Allow-Headers'), 'Content-Type');

      done();
    });
  });
});
