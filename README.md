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

  buffer - strong x   464,089 ops/sec ±1.38% (185 runs sampled)
  buffer - weak   x 1,154,033 ops/sec ±0.24% (195 runs sampled)
  string - strong x   222,036 ops/sec ±0.98% (188 runs sampled)
  string - weak   x   374,874 ops/sec ±0.52% (193 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 293,836 ops/sec ±1.01% (190 runs sampled)
  buffer - weak   x 300,585 ops/sec ±0.21% (195 runs sampled)
  string - strong x 156,011 ops/sec ±2.01% (187 runs sampled)
  string - weak   x 167,002 ops/sec ±1.28% (189 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 102,942 ops/sec ±0.76% (193 runs sampled)
  buffer - weak   x  69,593 ops/sec ±0.39% (193 runs sampled)
  string - strong x  58,533 ops/sec ±3.97% (185 runs sampled)
  string - weak   x  46,991 ops/sec ±3.05% (189 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 57,475 ops/sec ±0.61% (193 runs sampled)
  buffer - weak   x 36,124 ops/sec ±0.21% (194 runs sampled)
  string - strong x 38,994 ops/sec ±3.31% (187 runs sampled)
  string - weak   x 27,801 ops/sec ±2.56% (190 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 6,593 ops/sec ±0.21% (197 runs sampled)
  buffer - weak   x 3,719 ops/sec ±0.18% (195 runs sampled)
  string - strong x 5,125 ops/sec ±2.24% (191 runs sampled)
  string - weak   x 3,181 ops/sec ±1.90% (192 runs sampled)
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
