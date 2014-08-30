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

> etag@1.2.0 bench nodejs-etag
> node benchmark/index.js

> node benchmark/body0-100b.js

  100B body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x   502,914 ops/sec ±1.18% (185 runs sampled)
  buffer - weak   x 1,149,420 ops/sec ±0.48% (194 runs sampled)
  string - strong x   205,007 ops/sec ±2.08% (179 runs sampled)
  string - weak   x   356,944 ops/sec ±1.68% (192 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 293,298 ops/sec ±1.04% (190 runs sampled)
  buffer - weak   x 297,940 ops/sec ±0.23% (196 runs sampled)
  string - strong x 153,165 ops/sec ±2.02% (186 runs sampled)
  string - weak   x 169,967 ops/sec ±1.27% (187 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 103,880 ops/sec ±0.62% (194 runs sampled)
  buffer - weak   x 104,204 ops/sec ±0.73% (192 runs sampled)
  string - strong x  58,025 ops/sec ±4.10% (185 runs sampled)
  string - weak   x  59,181 ops/sec ±3.96% (186 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 57,975 ops/sec ±0.42% (195 runs sampled)
  buffer - weak   x 57,658 ops/sec ±0.48% (194 runs sampled)
  string - strong x 38,969 ops/sec ±3.44% (187 runs sampled)
  string - weak   x 38,979 ops/sec ±3.38% (187 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 6,517 ops/sec ±0.18% (194 runs sampled)
  buffer - weak   x 6,484 ops/sec ±0.18% (194 runs sampled)
  string - strong x 5,115 ops/sec ±2.29% (190 runs sampled)
  string - weak   x 5,071 ops/sec ±2.32% (190 runs sampled)
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/etag.svg?style=flat
[npm-url]: https://npmjs.org/package/etag
[node-version-image]: https://img.shields.io/badge/node.js-%3E%3D_0.8-brightgreen.svg?style=flat
[node-version-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/jshttp/etag.svg?style=flat
[travis-url]: https://travis-ci.org/jshttp/etag
[coveralls-image]: https://img.shields.io/coveralls/jshttp/etag.svg?style=flat
[coveralls-url]: https://coveralls.io/r/jshttp/etag?branch=master
[downloads-image]: https://img.shields.io/npm/dm/etag.svg?style=flat
[downloads-url]: https://npmjs.org/package/etag
