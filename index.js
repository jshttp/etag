/*!
 * etag
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = etag

/**
 * Module dependencies.
 */

var crypto = require('crypto')

/**
 * Create a simple ETag.
 *
 * @param {string|Buffer} entity
 * @return {String}
 * @api public
 */

function etag(entity) {
  if (entity == null) {
    throw new TypeError('argument entity is required')
  }

  var isBuffer = Buffer.isBuffer(entity)

  if (!isBuffer && typeof entity !== 'string') {
    throw new TypeError('argument entity must be string or Buffer')
  }

  if (entity.length === 0) {
    // fast-path empty body
    return '"1B2M2Y8AsgTpgAmY7PhCfg=="'
  }

  var hash = crypto
    .createHash('md5')
    .update(entity, 'utf8')
    .digest('base64')
  return '"' + hash + '"'
}
