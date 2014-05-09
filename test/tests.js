/*jshint indent: 2, node: true */
/*global setTimeout, require, describe, it */
'use strict';

var _Promise = require('es6-promise').Promise,
  debounce = require('../es6-promise-debounce')(_Promise),
  assert = require('assert'),
  equal = assert.equal;

var inc100 = function(obj, key){
  return new _Promise(function(resolve){
    setTimeout(function(){ obj[key]++; resolve(obj); }, 100);
  });
};

var inc100NoPromise = function(obj, key){
  obj[key]++;
  return obj;
};

describe('ES6 Promise debounce,', function(){
  it('should be a function', function(){
    equal(typeof debounce, 'function');
  });

  describe('with a non-Promise function', function(){

    it('should return a Promise', function(){
      var inc100D50 = debounce(inc100NoPromise, 50),
        obj = {x: 0},
        result = inc100D50(obj, 'x');
      assert(result instanceof _Promise);
    });

    it('should call a function', function(done){
      var inc100D50 = debounce(inc100NoPromise, 50),
        obj = {x: 0};
      inc100D50(obj, 'x').then(function(res){
        equal(obj, res);
        equal(obj.x, 1);
        done();
      });
    });

    it('should only call once when run repeatedly', function(done){
      var inc100D50 = debounce(inc100NoPromise, 50),
        obj = {x: 0};
      for(var i=0; i<100; i++){
        inc100D50(obj, 'x');
      }
      setTimeout(function(){
        equal(obj.x, 1);
        done();
      }, 1800);
    });

  });


  describe('with an incrementer,', function(){

    it('should return a Promise', function(){
      var inc100D50 = debounce(inc100, 50),
        obj = {x: 0},
        result = inc100D50(obj, 'x');
      assert(result instanceof _Promise);
    });

    it('should call a function', function(done){
      var inc100D50 = debounce(inc100, 50),
        obj = {x: 0};
      inc100D50(obj, 'x').then(function(res){
        equal(obj, res);
        equal(obj.x, 1);
        done();
      });
    });

    it('should only call once when run repeatedly', function(done){
      var inc100D50 = debounce(inc100, 50),
        obj = {x: 0};
      for(var i=0; i<100; i++){
        inc100D50(obj, 'x');
      }
      setTimeout(function(){
        equal(obj.x, 1);
        done();
      }, 1800);
    });
  });

});
