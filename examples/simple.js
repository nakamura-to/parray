var parray = require('../index');

var results = [];
parray.forEach([1, 2, 3], function (element, i) {
  results[i] = element * 2;
}, function () {
  console.log(results); // 2, 4, 6
  console.log('done');
});