'use strict';

exports.forEach = forEach;

var assert = require('assert');
var DEFAULT_CONCURRENCY = 10;

function forEach(array, worker, callback) {
  if (arguments.length === 1 && typeof arguments[0] === 'number') {
    var concurrency = arguments[0];
    return function (array, worker, callback) {
      return deferForEach(concurrency, array, worker, callback);
    };
  } else {
    return deferForEach(DEFAULT_CONCURRENCY, array, worker, callback);
  }
}

function deferForEach(concurrency, array, worker, callback) {
  assert(Array.isArray(array), 'An argument `array` must be an array.');
  assert(typeof worker === 'function', 'An argument `worker` must be a function.');
  assert(!callback || typeof callback === 'function', 'An argument `callback` must be a function, if specified.');
  var len = array.length;
  process.nextTick(function startLoop() {
    loop(0);
  });
  
  function loop(index) {
    for (var i = 0; i < concurrency && index < len; i++, index++) {
      worker.call(null, array[index], index, array);
    }
    if (index < len) {
      process.nextTick(function nextLoop() {
        loop(index);
      });
    } else {
      if (typeof callback === 'function') {
        callback(null);
      }
    }
  }
}