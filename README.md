# etag

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Create simple ETags

## Installation

```sh
$ npm install etag
```

## API

```js
var etag = require('etag')
```

### etag(entity, [options])

Generate a strong ETag for the given entity. This should be the complete
body of the entity. Strings, `Buffer`s, and `fs.Stats` are accepted. By
default, a strong ETag is generated except for `fs.Stats`, which will
generate a weak ETag (this can be overwritten by `options.weak`).

```js
res.setHeader('ETag', etag(body))
```

#### Options

`etag` accepts these properties in the options object.

##### weak

Specifies if a "strong" or a "weak" ETag will be generated. The ETag can only
really be a strong as the given input.

## Testing

```sh
$ npm test
```

## Benchmark

```bash
$ npm run-script bench

> etag@1.5.0-pre bench nodejs-etag
> node benchmark/index.js

> node benchmark/body0-100b.js

  100B body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x   426,717 ops/sec ±1.34% (181 runs sampled)
* buffer - weak   x 1,081,596 ops/sec ±0.32% (196 runs sampled)
  string - strong x   235,880 ops/sec ±1.01% (190 runs sampled)
  string - weak   x   373,234 ops/sec ±0.87% (192 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 274,188 ops/sec ±1.17% (192 runs sampled)
* buffer - weak   x 298,451 ops/sec ±0.49% (194 runs sampled)
  string - strong x 157,331 ops/sec ±2.12% (186 runs sampled)
  string - weak   x 169,242 ops/sec ±1.51% (188 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 102,624 ops/sec ±0.93% (193 runs sampled)
* buffer - weak   x 104,696 ops/sec ±1.17% (190 runs sampled)
  string - strong x  59,097 ops/sec ±3.93% (186 runs sampled)
  string - weak   x  59,202 ops/sec ±4.01% (185 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 54,768 ops/sec ±1.43% (188 runs sampled)
* buffer - weak   x 57,393 ops/sec ±1.10% (192 runs sampled)
  string - strong x 36,597 ops/sec ±3.81% (179 runs sampled)
  string - weak   x 35,525 ops/sec ±3.82% (186 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 6,243 ops/sec ±0.84% (194 runs sampled)
* buffer - weak   x 6,312 ops/sec ±0.95% (193 runs sampled)
  string - strong x 4,984 ops/sec ±2.21% (191 runs sampled)
  string - weak   x 5,068 ops/sec ±2.32% (190 runs sampled)
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/etag.svg?style=flat
[npm-url]: https://npmjs.org/package/etag
[node-version-image]: https://img.shields.io/node/v/etag.svg?style=flat
[node-version-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/jshttp/etag.svg?style=flat
[travis-url]: https://travis-ci.org/jshttp/etag
[coveralls-image]: https://img.shields.io/coveralls/jshttp/etag.svg?style=flat
[coveralls-url]: https://coveralls.io/r/jshttp/etag?branch=master
[downloads-image]: https://img.shields.io/npm/dm/etag.svg?style=flat
[downloads-url]: https://npmjs.org/package/etag
