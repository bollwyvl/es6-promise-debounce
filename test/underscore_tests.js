/*jshint indent: 2, node: true*/
/*global require, describe, it */
'use strict';

var assert = require('assert'),
  equal = assert.equal,
  _ = require('underscore'),

  _Promise = require('es6-promise').Promise,
  debounce = require('../es6-promise-debounce')(_Promise);

describe('the underscore.debounce test suite', function(){
  it('should debounce incrementing the counter', function(done){
    var counter = 0;
    var incr = function(){
      return new _Promise(function(resolve){ resolve(counter++); });
    };
    var debouncedIncr = debounce(incr, 32);
    debouncedIncr(); debouncedIncr();
    _.delay(debouncedIncr, 16);
    _.delay(function(){ equal(counter, 1, 'counter was incremented'); done(); }, 96);
  });

  describe('debounce by incrementing immediately then waiting', function(){
    var counter = 0;
    var incr = function(){
      return new _Promise(function(resolve){ resolve(counter++); });
    };
    var debouncedIncr = debounce(incr, 64, true);

    it('should increment counter with the first call', function(done){
      debouncedIncr()
        .then(function(){ equal(counter, 1, 'counter was incremented'); done(); });
    });

    it('should ignore the second call to increment', function(done){
      debouncedIncr()
        .then(function(){ equal(1, 2, 'this should never be called'); });
      _.delay(function(){ equal(counter, 1, 'second increment was ignored'); done(); }, 128);
    });

    it('should increment only once', function(done){
      counter = 0;
      _.delay(debouncedIncr, 16);
      _.delay(debouncedIncr, 32);
      _.delay(debouncedIncr, 48);
      _.delay(function(){ equal(counter, 1, 'counter was incremented once'); done(); }, 128);
    });
  });

  it('should debounce by incrementing immediately and recursively', function(done) {
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
    _.delay(function(){ equal(counter, 1, 'counter was incremented immediately'); });
    _.delay(function(){ equal(counter, 1, 'recursive increments were ignored'); done(); }, 96);
  });

  it('should debounce after system time is set backwards', function(done) {
    var counter = 0;
    var origNowFunc = _.now;
    var debouncedIncr = debounce(function(){
      return new _Promise(function(resolve){ resolve(counter++); });
    }, 100, true);

    debouncedIncr();
    _.delay(function(){ equal(counter, 1, 'counter was incremented immediately'); });

    _.now = function () {
      return new Date(2013, 0, 1, 1, 1, 1);
    };

    _.delay(function() {
      debouncedIncr();
      _.delay(function(){
        equal(counter, 2, 'counter was incremented twice');
        _.now = origNowFunc;
        done();
      });
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
