'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _callback = require('./callback');

var _callback2 = _interopRequireDefault(_callback);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var run = exports.run = function run(serverless, options) {
  var requireFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : require;
  var contextFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _context2.default;
  var callbackFn = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _callback2.default;
  var functionName = options.functionName;


  var functionObj = serverless.service.getFunction(functionName);
  var handler = functionObj.handler;

  var _handler$split = handler.split('.');

  var _handler$split2 = _slicedToArray(_handler$split, 2);

  var filename = _handler$split2[0];
  var handlerFunction = _handler$split2[1];

  filename = filename + '.js';

  var servicePath = serverless.config.servicePath;

  var importedHandler = requireFn(_path2.default.join(servicePath, filename));

  var event = requireFn(_path2.default.join(servicePath, 'event.json'));

  importedHandler[handlerFunction](event, contextFn(functionName, serverless), callbackFn(serverless));
};