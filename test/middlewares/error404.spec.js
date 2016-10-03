/* eslint consistent-return: 0 */
const assert = require('assert');
const error404 = require('../../lib/middlewares/error404');
const sinon = require('sinon');

describe('error404 middleware', () => {
  it('should call \'next\' with instance of \'boom\' error', () => {
    const next = sinon.spy();
    error404({}, {}, next);

    assert(next.calledOnce);
    assert(next.args[0][0] instanceof Error);
    assert(next.args[0][0].isBoom);
  });
});
