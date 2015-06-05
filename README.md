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

  buffer - strong x   303,333 ops/sec ±1.09% (192 runs sampled)
* buffer - weak   x 1,072,523 ops/sec ±0.35% (198 runs sampled)
  string - strong x   288,768 ops/sec ±1.00% (190 runs sampled)
  string - weak   x   352,627 ops/sec ±0.81% (195 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  buffer - strong x 214,421 ops/sec ±0.85% (192 runs sampled)
* buffer - weak   x 303,724 ops/sec ±0.23% (196 runs sampled)
  string - strong x 204,923 ops/sec ±0.85% (194 runs sampled)
  string - weak   x 160,254 ops/sec ±1.29% (183 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 93,069 ops/sec ±0.50% (196 runs sampled)
* buffer - weak   x 93,117 ops/sec ±0.57% (195 runs sampled)
  string - strong x 89,057 ops/sec ±0.61% (193 runs sampled)
  string - weak   x 88,884 ops/sec ±0.58% (195 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 55,901 ops/sec ±0.35% (196 runs sampled)
* buffer - weak   x 55,689 ops/sec ±0.51% (197 runs sampled)
  string - strong x 53,351 ops/sec ±0.45% (194 runs sampled)
  string - weak   x 53,202 ops/sec ±0.44% (196 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

* buffer - strong x 6,682 ops/sec ±0.17% (197 runs sampled)
* buffer - weak   x 6,664 ops/sec ±0.13% (197 runs sampled)
  string - strong x 6,334 ops/sec ±0.22% (197 runs sampled)
  string - weak   x 6,401 ops/sec ±0.16% (198 runs sampled)

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
