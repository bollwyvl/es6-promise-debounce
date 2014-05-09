/*jshint indent:2 */
/*global setTimeout, clearTimeout, exports: true, module, define */
(function(){
  'use strict';

  // Establish the root object, `window` in the browser, or `exports` on the
  // server.
  var root = this;

  function factory (Promise) {
    /**
     * Creates a debounced version of the given function. The new function
     * will postpose the given function's execution until a certain wait
     * period has expired. Once the function has been executed, it may
     * be executed again but only after the wait period has expired again. This
     * behavior is useful for implementing costly processes that need to wait
     * for user input that may be changing frequently.
     *
     * Alternatively, the given function may be executed immediately (and
     * then any subsequent call will be ignored unless the wait period has
     * expired). This behavior is set by passing true for the "immediate"
     * parameter and an example where it is useful is for preventing double
     * clicks in order to prevent double submission of data on a user interface.
     *
     * This function will create a new Promise each time this function is
     * called. Any existing promise is discarded; it was either already
     * resolved because the bouncing wait period ended, or it will now never
     * be resolved because a new call occurred during the wait period.
     *
     * @param fn the function to debounce.
     * @param wait the wait period in milliseconds.
     * @param [immediate] true to execute immediately (default: false).
     *
     * @return a Promise that resolves when "fn" is to be executed.
     */
    return function(fn, wait, immediate) {
      var timer = null;
      return function() {
        var context = this;
        var args = arguments;
        var resolve;
        var promise = new Promise(function(_resolve) {
          resolve = _resolve;
        }).then(function() {
          return fn.apply(context, args);
        });
        if(!!immediate && !timer) {
          resolve();
        }
        if(timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function() {
          timer = null;
          if(!immediate) {
            resolve();
          }
        }, wait);
        return promise;
      };
    };
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
