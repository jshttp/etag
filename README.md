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

### etag(str)

Generate a strong ETag for the given string. This string should be the
complete body.

```js
res.setHeader('ETag', etag(body))
```

### etag(buf)

Generate a strong ETag for the given `Buffer`. This buffer should be the
complete body.

```js
res.setHeader('ETag', etag(buf))
```

## Testing

```sh
$ npm test
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/etag.svg?style=flat
[npm-url]: https://npmjs.org/package/etag
[node-version-image]: http://img.shields.io/badge/node.js->=_0.8-brightgreen.svg?style=flat
[node-version-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/jshttp/etag.svg?style=flat
[travis-url]: https://travis-ci.org/jshttp/etag
[coveralls-image]: https://img.shields.io/coveralls/jshttp/etag.svg?style=flat
[coveralls-url]: https://coveralls.io/r/jshttp/etag?branch=master
[downloads-image]: http://img.shields.io/npm/dm/etag.svg?style=flat
[downloads-url]: https://npmjs.org/package/etag
