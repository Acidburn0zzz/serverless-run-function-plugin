'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _callback = require('./callback');

var _callback2 = _interopRequireDefault(_callback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);

describe('callback', function () {
  var serverless = void 0;
  var fn = void 0;

  beforeEach(function () {
    serverless = {
      cli: {
        log: _sinon2.default.spy()
      }
    };
    fn = (0, _callback2.default)(serverless);
  });

  it('is a function returning a function', function () {
    (0, _chai.expect)(fn).to.be.a('function');
  });

  describe('inner function', function () {
    it('prints out error if there is an error, and does not run success', function () {
      var error = new Error('error');
      fn(error);
      (0, _chai.expect)(serverless.cli.log).to.have.been.calledWith('Failed - This Error Was Returned:');
      (0, _chai.expect)(serverless.cli.log).to.have.been.calledWith('error');
      (0, _chai.expect)(serverless.cli.log).to.have.been.calledWith(error.stack);
      (0, _chai.expect)(serverless.cli.log).to.not.have.been.calledWith('Success! - This Response Was Returned:');
    });

    it('prints out stringified result if there is no error', function () {
      fn(null, 'result');
      (0, _chai.expect)(serverless.cli.log).to.have.been.calledWith('Success! - This Response Was Returned:');
      (0, _chai.expect)(serverless.cli.log).to.have.been.calledWith('"result"');
    });
  });
});