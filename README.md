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

  buffer - strong x   425,962 ops/sec ±1.21% (186 runs sampled)
* buffer - weak   x 1,094,538 ops/sec ±0.35% (197 runs sampled)
  string - strong x   437,636 ops/sec ±1.31% (183 runs sampled)
  string - weak   x   316,978 ops/sec ±1.55% (188 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 278,712 ops/sec ±1.00% (193 runs sampled)
* buffer - weak   x 300,008 ops/sec ±0.30% (196 runs sampled)
  string - strong x 276,016 ops/sec ±1.13% (188 runs sampled)
  string - weak   x 166,522 ops/sec ±1.47% (192 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 105,233 ops/sec ±0.65% (195 runs sampled)
* buffer - weak   x 108,091 ops/sec ±0.81% (194 runs sampled)
  string - strong x 102,725 ops/sec ±0.80% (192 runs sampled)
  string - weak   x 102,649 ops/sec ±0.85% (193 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 59,673 ops/sec ±0.46% (195 runs sampled)
* buffer - weak   x 61,525 ops/sec ±0.54% (194 runs sampled)
  string - strong x 57,557 ops/sec ±0.62% (194 runs sampled)
  string - weak   x 58,627 ops/sec ±0.59% (195 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 6,733 ops/sec ±0.26% (196 runs sampled)
* buffer - weak   x 6,920 ops/sec ±0.40% (197 runs sampled)
  string - strong x 6,344 ops/sec ±0.47% (193 runs sampled)
  string - weak   x 6,236 ops/sec ±1.03% (189 runs sampled)
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
