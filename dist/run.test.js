'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _run = require('./run');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);

describe('run function', function () {
  var functionObj = {
    handler: 'file.handler'
  };
  var serverless = {
    service: {},
    utils: {},
    config: {
      servicePath: 'path'
    }
  };
  var options = {
    functionName: 'name'
  };
  var requiredFile = {};
  var event = {};

  var getFunctionStub = void 0;
  var requireStub = void 0;
  var contextStub = void 0;
  var callbackStub = void 0;

  before(function () {
    getFunctionStub = _sinon2.default.stub().returns(functionObj);
    serverless.service.getFunction = getFunctionStub;

    requiredFile.handler = _sinon2.default.spy();
    requireStub = _sinon2.default.stub();
    requireStub.onFirstCall().returns(requiredFile);
    requireStub.onSecondCall().returns(event);

    contextStub = _sinon2.default.stub().returns('context');
    callbackStub = _sinon2.default.stub().returns('callback');

    (0, _run.run)(serverless, options, requireStub, contextStub, callbackStub);
  });

  it('gets function by its function name', function () {
    (0, _chai.expect)(getFunctionStub).to.have.been.calledWith('name');
  });

  it('requires the file', function () {
    (0, _chai.expect)(requireStub).to.have.been.calledWith(_path2.default.join('path', 'file.js'));
  });

  it('gets event.json', function () {
    (0, _chai.expect)(requireStub).to.have.been.calledWith(_path2.default.join('path', 'event.json'));
  });

  it('runs the function with event.json, context, and callback', function () {
    (0, _chai.expect)(contextStub).to.have.been.calledWith('name', serverless);
    (0, _chai.expect)(callbackStub).to.have.been.calledWith(serverless);
    (0, _chai.expect)(requiredFile.handler).to.have.been.calledWith(event, 'context', 'callback');
  });
});