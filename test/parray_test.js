var parray = require('../index');
var assert = require('assert');

describe('forEach', function() {
  it('should handle each element', function (done) {
    var results = [];
    var array = [1, 2, 3];
    parray.forEach(array, function (element, index, array2) {
      results.push({element: element, index: index, array: array2});
    }, function () {
      assert.deepEqual([
        {element: 1, index: 0, array: array}, 
        {element: 2, index: 1, array: array},
        {element: 3, index: 2, array: array}],
        results
      );
      done();
    });
  });

  it('should handle each element with specific concurrency', function (done) {
    var results = [];
    var array = [1, 2, 3];
    parray.forEach(1)(array, function (element, index, array2) {
      results.push({element: element, index: index, array: array2});
    }, function () {
      assert.deepEqual([
        {element: 1, index: 0, array: array},
        {element: 2, index: 1, array: array},
        {element: 3, index: 2, array: array}],
        results
      );
      done();
    });
  });

});
