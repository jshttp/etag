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

  buffer - strong x   356,620 ops/sec ±1.00% (188 runs sampled)
* buffer - weak   x 1,060,480 ops/sec ±0.16% (196 runs sampled)
  string - strong x   362,640 ops/sec ±1.25% (190 runs sampled)
  string - weak   x   349,508 ops/sec ±1.02% (194 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 242,845 ops/sec ±0.86% (193 runs sampled)
* buffer - weak   x 288,836 ops/sec ±0.59% (194 runs sampled)
  string - strong x 227,515 ops/sec ±1.70% (189 runs sampled)
  string - weak   x 171,569 ops/sec ±1.27% (190 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 98,021 ops/sec ±0.56% (194 runs sampled)
* buffer - weak   x 97,645 ops/sec ±0.62% (195 runs sampled)
  string - strong x 95,969 ops/sec ±0.65% (193 runs sampled)
  string - weak   x 92,749 ops/sec ±0.62% (193 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 56,318 ops/sec ±0.53% (196 runs sampled)
* buffer - weak   x 56,339 ops/sec ±0.63% (197 runs sampled)
  string - strong x 55,192 ops/sec ±0.47% (194 runs sampled)
  string - weak   x 54,433 ops/sec ±0.47% (194 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 6,652 ops/sec ±0.17% (197 runs sampled)
* buffer - weak   x 6,610 ops/sec ±0.14% (196 runs sampled)
  string - strong x 6,336 ops/sec ±0.22% (197 runs sampled)
  string - weak   x 5,925 ops/sec ±1.40% (191 runs sampled)

> node benchmark/stats.js

  stats

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* real - strong x 1,670,386 ops/sec ±0.12% (196 runs sampled)
* real - weak   x 1,671,774 ops/sec ±0.22% (197 runs sampled)
  fake - strong x   928,226 ops/sec ±0.20% (196 runs sampled)
  fake - weak   x   923,634 ops/sec ±0.17% (197 runs sampled)
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
