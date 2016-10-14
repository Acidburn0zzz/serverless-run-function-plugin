'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);

describe('context', function () {
  var callback = void 0;
  var obj = void 0;
  var callbackSpy = void 0;

  beforeEach(function () {
    callbackSpy = _sinon2.default.spy();
    callback = _sinon2.default.stub().returns(callbackSpy);
    obj = (0, _context2.default)('name', 'serverless', callback);
  });

  it('is a function returning an object', function () {
    (0, _chai.expect)(obj).to.be.an('object');
  });

  describe('object has', function () {
    it('awsRequestId', function () {
      (0, _chai.expect)(obj.awsRequestId).to.equal('id');
    });

    it('invokeid', function () {
      (0, _chai.expect)(obj.invokeid).to.equal('id');
    });

    it('logGroupName', function () {
      (0, _chai.expect)(obj.logGroupName).to.equal('/aws/lambda/name');
    });

    it('logStreamName', function () {
      (0, _chai.expect)(obj.logStreamName).to.equal('2015/09/22/[HEAD]13370a84ca4ed8b77c427af260');
    });

    it('functionVersion', function () {
      (0, _chai.expect)(obj.functionVersion).to.equal('HEAD');
    });

    it('isDefaultFunctionVersion', function () {
      (0, _chai.expect)(obj.isDefaultFunctionVersion).to.equal(true);
    });

    it('functionName', function () {
      (0, _chai.expect)(obj.functionName).to.equal('name');
    });

    it('memoryLimitInMB', function () {
      (0, _chai.expect)(obj.memoryLimitInMB).to.equal('1024');
    });

    it('succeed which calls the callback with result', function () {
      obj.succeed('result');
      (0, _chai.expect)(callback).to.have.been.calledWith('serverless');
      (0, _chai.expect)(callbackSpy).to.have.been.calledWith(null, 'result');
    });

    it('fail which calls the callback with error', function () {
      obj.fail('error');
      (0, _chai.expect)(callback).to.have.been.calledWith('serverless');
      (0, _chai.expect)(callbackSpy).to.have.been.calledWith('error');
    });

    it('done which calls the callback directly', function () {
      obj.done(1, 2, 3);
      (0, _chai.expect)(callback).to.have.been.calledWith('serverless');
      (0, _chai.expect)(callbackSpy).to.have.been.calledWith(1, 2, 3);
    });

    it('getRemainingTimeInMillis which returns 5s', function () {
      (0, _chai.expect)(obj.getRemainingTimeInMillis()).to.equal(5000);
    });
  });
});