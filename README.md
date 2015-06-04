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

> etag@1.6.0 bench nodejs-etag
> node benchmark/index.js

  http_parser@1.0
  node@0.10.33
  v8@3.14.5.9
  ares@1.9.0-DEV
  uv@0.10.29
  zlib@1.2.3
  modules@11
  openssl@1.0.1j

> node benchmark/body0-100b.js

  100B body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x   425,007 ops/sec ±1.47% (184 runs sampled)
* buffer - weak   x 1,009,859 ops/sec ±0.18% (197 runs sampled)
  string - strong x   442,096 ops/sec ±1.20% (181 runs sampled)
  string - weak   x   325,063 ops/sec ±0.31% (192 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 263,069 ops/sec ±1.60% (190 runs sampled)
* buffer - weak   x 295,732 ops/sec ±0.43% (199 runs sampled)
  string - strong x 274,822 ops/sec ±1.15% (191 runs sampled)
  string - weak   x 169,473 ops/sec ±1.59% (194 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 104,169 ops/sec ±0.61% (196 runs sampled)
* buffer - weak   x 104,281 ops/sec ±0.66% (197 runs sampled)
  string - strong x 101,236 ops/sec ±0.68% (195 runs sampled)
  string - weak   x  98,601 ops/sec ±0.71% (196 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 59,081 ops/sec ±0.43% (197 runs sampled)
* buffer - weak   x 58,516 ops/sec ±0.56% (195 runs sampled)
  string - strong x 56,757 ops/sec ±0.50% (194 runs sampled)
  string - weak   x 55,653 ops/sec ±0.64% (194 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 6,662 ops/sec ±0.13% (195 runs sampled)
* buffer - weak   x 6,663 ops/sec ±0.12% (197 runs sampled)
  string - strong x 6,380 ops/sec ±0.18% (196 runs sampled)
  string - weak   x 6,369 ops/sec ±0.14% (196 runs sampled)

> node benchmark/stats.js

  stats

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  real - strong x 223,948 ops/sec ±0.49% (193 runs sampled)
* real - weak   x 354,211 ops/sec ±0.30% (196 runs sampled)
  fake - strong x 173,727 ops/sec ±0.42% (193 runs sampled)
  fake - weak   x 252,173 ops/sec ±0.20% (197 runs sampled)
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/etag.svg
[npm-url]: https://npmjs.org/package/etag
[node-version-image]: https://img.shields.io/node/v/etag.svg
[node-version-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/jshttp/etag/master.svg
[travis-url]: https://travis-ci.org/jshttp/etag
[coveralls-image]: https://img.shields.io/coveralls/jshttp/etag/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/etag?branch=master
[downloads-image]: https://img.shields.io/npm/dm/etag.svg
[downloads-url]: https://npmjs.org/package/etag
