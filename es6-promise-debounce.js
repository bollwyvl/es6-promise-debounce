/*jshint indent:2 */
/*global setTimeout, clearTimeout, exports: true, module, define */
(function(){
  'use strict';

  // Establish the root object, `window` in the browser, or `exports` on the
  // server.
  var root = this;
  
  function factory (Promise) {
    function debounce(func, wait, immediate) {
      var timeout, args, context, callNow, resolve, reject,
        promise = new Promise (function(_resolve, _reject) {
          resolve = _resolve;
          reject = _reject;
        }),
        complete = function(){
          func.apply(context, args).then(resolve, reject);
        };

      return function(){
        args = arguments;
        context = this;

        callNow = !!immediate && !timeout;

        if(timeout){ clearTimeout(timeout); }

        timeout = setTimeout(function(){
          timeout = null;
          if(!immediate){
            complete();
          }
        }, wait);

        if(callNow){ complete(); }

        return promise;
      };
    }

    return debounce;
  }

  // Export the debounce object for **Node.js**, with
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory;
    }
    exports.debouncePromise = factory;
  } else {
    root.debouncePromise = factory;
  }

  if (typeof define === 'function' && define.amd) {
    define('es6-promise-debounce', [], function() {
      return factory;
    });
  }
}).call(this);
