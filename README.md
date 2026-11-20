# etag

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][ci-image]][ci-url]
[![Coverage Status][codecov-image]][codecov-url]

Create simple HTTP ETags.

This module generates HTTP ETags (as defined in RFC 7232) for use in HTTP responses.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/). Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install etag
```

## API

```js
import { etag } from "etag";
```

### etag(entity, [options])

Generate an ETag for a string, ArrayBuffer view (a typed array such as `Buffer`, or a `DataView`), or file stats object. Pass the complete body when using a string or view. Only the bytes within the view are hashed. File stats can come from `fs.stat` or `fs.statSync`, with or without `{ bigint: true }`. Strings and views generate strong ETags by default. File stats generate weak ETags by default. Use `options.weak` to override the default.

```js
res.setHeader("ETag", etag(body));
```

#### Options

`etag` accepts these properties in the options object.

##### weak

Specifies whether the generated ETag includes the weak validator mark (the leading `W/`). The actual entity tag is the same. The default is `true` for file stats and `false` for strings and ArrayBuffer views.

## License

[MIT](LICENSE)

[ci-image]: https://img.shields.io/github/actions/workflow/status/jshttp/etag/ci.yml?branch=master&label=ci
[ci-url]: https://github.com/jshttp/etag/actions/workflows/ci.yml
[codecov-image]: https://img.shields.io/codecov/c/gh/jshttp/etag/master
[codecov-url]: https://codecov.io/gh/jshttp/etag
[node-image]: https://img.shields.io/node/v/etag
[node-url]: https://nodejs.org/en/download
[npm-downloads-image]: https://img.shields.io/npm/dm/etag
[npm-url]: https://npmjs.org/package/etag
[npm-version-image]: https://img.shields.io/npm/v/etag
