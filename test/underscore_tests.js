/*jshint indent:2 */
/*global describe, it */
'use strict';

var assert = require('assert'),
  equal = assert.equal,
  _ = require('underscore'),

  _Promise = require('es6-promise').Promise,
  debounce = require('../es6-promise-debounce')(_Promise);

describe('the underscore.debounce test suite', function(){
  it('debounce', function(done){
    var counter = 0;
    var incr = function(){
      return new _Promise(function(resolve){ resolve(counter++); });
    };
    var debouncedIncr = debounce(incr, 32);
    debouncedIncr(); debouncedIncr();
    _.delay(debouncedIncr, 16);
    _.delay(function(){ equal(counter, 1, 'incr was debounced'); done(); }, 96);
  });

  describe('debounce asap', function(){
    var counter = 0;
    var incr = function(){
      return new _Promise(function(resolve){ resolve(counter++); });
    };
    var debouncedIncr = debounce(incr, 64, true);

    it('first immediate call', function(done){
      debouncedIncr()
        .then(function(){ equal(counter, 1, 'incr was debounced'); done(); });
    });

    it('second immediate call', function(done){
      debouncedIncr()
        .then(function(){ equal(counter, 1, 'incr was debounced'); done(); });
    });

    it('debounce asap', function(done){
      equal(counter, 1, 'incr was called immediately');
      _.delay(debouncedIncr, 16);
      _.delay(debouncedIncr, 32);
      _.delay(debouncedIncr, 48);
      _.delay(function(){ equal(counter, 1, 'incr was debounced'); done(); }, 128);
    });
  });

  it('debounce asap recursively', function(done) {
    var counter = 0;
    var debouncedIncr = debounce(function(){
      return new _Promise(function(resolve){
        counter++;
        if (counter < 10) {
          debouncedIncr();
        }
        resolve(counter);
      });
    }, 32, true);
    debouncedIncr();
    equal(counter, 1, 'incr was called immediately');
    _.delay(function(){ equal(counter, 1, 'incr was debounced'); done(); }, 96);
  });

  it('debounce after system time is set backwards', function(done) {
    var counter = 0;
    var origNowFunc = _.now;
    var debouncedIncr = debounce(function(){
      return new _Promise(function(resolve){ resolve(counter++); });
    }, 100, true);

    debouncedIncr();
    equal(counter, 1, 'incr was called immediately');

    _.now = function () {
      return new Date(2013, 0, 1, 1, 1, 1);
    };

    _.delay(function() {
      debouncedIncr();
      equal(counter, 2, 'incr was debounced successfully');
      done();
      _.now = origNowFunc;
    }, 200);
  });

  it('debounce re-entrant', function(done) {
    var sequence = [
      ['b1', 'b2']
    ];
    var value = '';
    var debouncedAppend;
    var append = function(arg){
      var that = this;
      return new _Promise(function(resolve){
        value += that + arg;
        var args = sequence.pop();
        if (args) {
          debouncedAppend.call(args[0], args[1]);
        }
        resolve();
      });
    };
    debouncedAppend = debounce(append, 32);
    debouncedAppend.call('a1', 'a2');
    equal(value, '');
    _.delay(function(){
      equal(value, 'a1a2b1b2', 'append was debounced successfully');
      done();
    }, 100);
  });
});
