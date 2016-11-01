# etag

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Create simple HTTP ETags

This module generates HTTP ETags (as defined in RFC 7232) for use in
HTTP responses.

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

Specifies if the generated ETag will include the weak validator mark (that
is, the leading `W/`). The actual entity tag is the same. The default value
is `false`, unless the `entity` is `fs.Stats`, in which case it is `true`.

## Testing

```sh
$ npm test
```

## Benchmark

```bash
$ npm run-script bench

> etag@1.6.0 bench nodejs-etag
> node benchmark/index.js

  http_parser@2.7.0
  node@6.9.1
  v8@5.1.281.84
  uv@1.9.1
  zlib@1.2.8
  ares@1.10.1-DEV
  icu@57.1
  modules@48
  openssl@1.0.2j

> node benchmark/body0-100b.js

  100B body

  4 tests completed.

* buffer - strong x 505,815 ops/sec ±0.50% (191 runs sampled)
* buffer - weak   x 500,908 ops/sec ±0.76% (180 runs sampled)
  string - strong x 472,200 ops/sec ±0.82% (184 runs sampled)
  string - weak   x 476,013 ops/sec ±0.65% (183 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  4 tests completed.

* buffer - strong x 304,590 ops/sec ±0.33% (184 runs sampled)
* buffer - weak   x 303,541 ops/sec ±0.45% (185 runs sampled)
  string - strong x 231,653 ops/sec ±0.80% (190 runs sampled)
  string - weak   x 232,628 ops/sec ±0.77% (191 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  4 tests completed.

* buffer - strong x 106,489 ops/sec ±0.32% (191 runs sampled)
* buffer - weak   x 106,141 ops/sec ±0.46% (192 runs sampled)
  string - strong x  69,743 ops/sec ±0.57% (190 runs sampled)
  string - weak   x  70,490 ops/sec ±0.41% (192 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  4 tests completed.

* buffer - strong x 58,854 ops/sec ±0.30% (193 runs sampled)
* buffer - weak   x 58,298 ops/sec ±0.38% (190 runs sampled)
  string - strong x 37,191 ops/sec ±0.35% (192 runs sampled)
  string - weak   x 37,362 ops/sec ±0.35% (194 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  4 tests completed.

* buffer - strong x 6,558 ops/sec ±0.10% (194 runs sampled)
* buffer - weak   x 6,564 ops/sec ±0.11% (194 runs sampled)
  string - strong x 4,004 ops/sec ±0.12% (193 runs sampled)
  string - weak   x 3,983 ops/sec ±0.22% (193 runs sampled)

> node benchmark/stats.js

  stat

  4 tests completed.

* real - strong x 1,465,099 ops/sec ±0.45% (190 runs sampled)
* real - weak   x 1,451,709 ops/sec ±0.60% (190 runs sampled)
  fake - strong x   637,166 ops/sec ±0.28% (191 runs sampled)
  fake - weak   x   632,457 ops/sec ±0.35% (193 runs sampled)
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/etag.svg
[npm-url]: https://npmjs.org/package/etag
[node-version-image]: https://img.shields.io/node/v/etag.svg
[node-version-url]: https://nodejs.org/en/download/
[travis-image]: https://img.shields.io/travis/jshttp/etag/master.svg
[travis-url]: https://travis-ci.org/jshttp/etag
[coveralls-image]: https://img.shields.io/coveralls/jshttp/etag/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/etag?branch=master
[downloads-image]: https://img.shields.io/npm/dm/etag.svg
[downloads-url]: https://npmjs.org/package/etag
