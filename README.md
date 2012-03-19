Parray — An utility to handle array elements in parallel
========================================================

Parray is an utility to handle array elements in parallel in Node environment.

## Installing

```
$ npm install parray
```

## Example

```js
var parray = require('parray');

var results = [];
parray.forEach([1, 2, 3], function (element, i) {
  results[i] = element * 2;
}, function () {
  console.log(results); // 2, 4, 6
  console.log('done');
});
```

## API

`parray` module provides following API. 

### forEach(Array array, Function worker(element, index, traversedArray), Function callback()) -> Void

A function to execute a provided function once per array element in parallel.

* `array`: Required. An array.
* `worker`: Required. A function being executed once per array element. 
* `element`: Required. A current element.
* `index`: Required. An element index.
* `traversedArray`: Required. An array object being traversed.
* `callback`: Optional. A function being executed when all elements are handled.

### forEach([Number concurrency]) -> Function

A function to accept a concurrency number and return another `forEach` function which executes 
a provided function once per array element in parallel with the specified cuncurrency.
If you use another `forEach` function directly, default concurrency `10` is used.

* `concurrency`: Required. A number of concurrency.

## More Examples

### Concurrency

Use `forEach(concurrency)` function.

```js
var parray = require('parray');

var results = [];
parray.forEach(1)([1, 2, 3], function (element, i) {
  results[i] = element * 2;
}, function () {
  console.log(results); // 2, 4, 6
  console.log('done');
});
```

### Waiting

Use [Gate](https://github.com/nakamura-to/gate) to await asynchronous calls.

```js
var gate = require('gate');
var parray = require('parray');
var fs = require('fs');

var files = ['file1', 'file2'];
var latch = gate.latch();
parray.forEach(files, function (file) {
  fs.readFile(file, 'utf8', latch({name: file, data: 1}));
}, function () {
  latch.await(function (err, results) {
    if (err) throw err;
    console.log(results[0]); // { name: 'file1', data: 'FILE1' }
    console.log(results[1]); // { name: 'file2', data: 'FILE2' }
    console.log('done');
  });
});
```
