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

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install etag
```

## API

<!-- eslint-disable no-unused-vars -->

```js
var etag = require('etag')
```

### etag(entity, [options])

Generate a strong ETag for the given entity. This should be the complete
body of the entity. Strings, `Buffer`s, and `fs.Stats` are accepted. By
default, a strong ETag is generated except for `fs.Stats`, which will
generate a weak ETag (this can be overwritten by `options.weak`).

<!-- eslint-disable no-undef -->

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

> etag@1.8.0 bench nodejs-etag
> node benchmark/index.js

  http_parser@2.7.0
  node@6.11.1
  v8@5.1.281.103
  uv@1.11.0
  zlib@1.2.11
  ares@1.10.1-DEV
  icu@58.2
  modules@48
  openssl@1.0.2k

> node benchmark/body0-100b.js

  100B body

  4 tests completed.

  buffer - strong x 243,287 ops/sec ±0.53% (186 runs sampled)
  buffer - weak   x 239,622 ops/sec ±0.93% (182 runs sampled)
  string - strong x 242,971 ops/sec ±1.20% (184 runs sampled)
  string - weak   x 250,769 ops/sec ±1.17% (185 runs sampled)

> node benchmark/body1-1kb.js

  1KB body

  4 tests completed.

  buffer - strong x 186,048 ops/sec ±0.49% (185 runs sampled)
  buffer - weak   x 187,783 ops/sec ±0.61% (187 runs sampled)
  string - strong x 138,354 ops/sec ±1.06% (187 runs sampled)
  string - weak   x 140,999 ops/sec ±0.93% (188 runs sampled)

> node benchmark/body2-5kb.js

  5KB body

  4 tests completed.

  buffer - strong x 90,927 ops/sec ±0.51% (189 runs sampled)
  buffer - weak   x 91,207 ops/sec ±0.59% (190 runs sampled)
  string - strong x 49,573 ops/sec ±0.58% (187 runs sampled)
  string - weak   x 49,811 ops/sec ±0.65% (189 runs sampled)

> node benchmark/body3-10kb.js

  10KB body

  4 tests completed.

  buffer - strong x 54,223 ops/sec ±1.16% (189 runs sampled)
  buffer - weak   x 53,987 ops/sec ±1.00% (189 runs sampled)
  string - strong x 27,067 ops/sec ±0.53% (189 runs sampled)
  string - weak   x 27,215 ops/sec ±0.63% (188 runs sampled)

> node benchmark/body4-100kb.js

  100KB body

  4 tests completed.

  buffer - strong x 7,060 ops/sec ±0.56% (190 runs sampled)
  buffer - weak   x 7,092 ops/sec ±0.37% (190 runs sampled)
  string - strong x 3,062 ops/sec ±0.45% (190 runs sampled)
  string - weak   x 3,069 ops/sec ±0.33% (190 runs sampled)

> node benchmark/stats.js

  stat

  4 tests completed.

  real - strong x 870,504 ops/sec ±0.46% (189 runs sampled)
  real - weak   x 846,965 ops/sec ±0.46% (187 runs sampled)
  fake - strong x 395,800 ops/sec ±0.45% (189 runs sampled)
  fake - weak   x 392,033 ops/sec ±0.66% (189 runs sampled)
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
