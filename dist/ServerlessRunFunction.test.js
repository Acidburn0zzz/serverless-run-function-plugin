'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _chai = require('chai');

var _ServerlessRunFunction = require('./ServerlessRunFunction');

describe('ServerlessRunFunction', function () {
  context('is an object that', function () {
    it('has hooks set, passing to them serverless and options', function () {
      var serverless = {};
      var options = {};
      var obj = new _ServerlessRunFunction.ServerlessRunFunction(serverless, options);
      // deep equal with params doesn't work because
      // bound functions are new objects - different ref
      (0, _chai.expect)(_typeof(obj.hooks['run:run'])).to.equal('function');
    });

    it('has command set', function () {
      var serverless = {};
      var options = {};
      var obj = new _ServerlessRunFunction.ServerlessRunFunction(serverless, options);
      (0, _chai.expect)(obj.commands).to.deep.equal({
        run: {
          usage: 'Runs a serverless function',
          lifecycleEvents: ['run'],
          options: {
            functionName: {
              usage: 'Name of the function to run',
              required: true,
              shortcut: 'f'
            }
          }
        }
      });
    });
  });
});