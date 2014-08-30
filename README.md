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
default, a string or `fs.Stats` will generate a weak ETag while a `Buffer`
will generate a strong ETag (this can be overwritten by `options.weak`).

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

> etag@1.2.0 bench nodejs-etag
> node benchmark/index.js

> node benchmark/body0-100b.js

  100B body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 491,689 ops/sec ±1.13% (187 runs sampled)
  buffer - weak   x 348,134 ops/sec ±0.50% (192 runs sampled)
  string - strong x 214,528 ops/sec ±1.37% (188 runs sampled)
  string - weak   x 186,822 ops/sec ±0.77% (192 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 272,942 ops/sec ±1.77% (187 runs sampled)
  buffer - weak   x  56,992 ops/sec ±1.79% (191 runs sampled)
  string - strong x 138,006 ops/sec ±2.58% (180 runs sampled)
  string - weak   x  52,234 ops/sec ±0.83% (196 runs sampled)

> node benchmark/body2-10kb.js

  10KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 58,102 ops/sec ±0.47% (195 runs sampled)
  buffer - weak   x  6,606 ops/sec ±1.20% (192 runs sampled)
  string - strong x 34,172 ops/sec ±4.43% (182 runs sampled)
  string - weak   x  5,928 ops/sec ±1.38% (189 runs sampled)

> node benchmark/body3-100kb.js

  100KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 6,461 ops/sec ±0.46% (194 runs sampled)
  buffer - weak   x   594 ops/sec ±1.23% (188 runs sampled)
  string - strong x 5,044 ops/sec ±2.37% (190 runs sampled)
  string - weak   x   536 ops/sec ±1.96% (171 runs sampled)

> node benchmark/body4-1mb.js

  1MB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x   638 ops/sec ±0.73% (188 runs sampled)
  buffer - weak   x 14.68 ops/sec ±1.84% (137 runs sampled)
  string - strong x   515 ops/sec ±2.06% (186 runs sampled)
  string - weak   x 14.70 ops/sec ±1.59% (137 runs sampled)
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/etag.svg?style=flat
[npm-url]: https://npmjs.org/package/etag
[node-version-image]: http://img.shields.io/badge/node.js-%3E%3D_0.8-brightgreen.svg?style=flat
[node-version-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/jshttp/etag.svg?style=flat
[travis-url]: https://travis-ci.org/jshttp/etag
[coveralls-image]: https://img.shields.io/coveralls/jshttp/etag.svg?style=flat
[coveralls-url]: https://coveralls.io/r/jshttp/etag?branch=master
[downloads-image]: http://img.shields.io/npm/dm/etag.svg?style=flat
[downloads-url]: https://npmjs.org/package/etag
