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
  var hash = crypto
    .createHash('md5')
    .update(entity, 'utf8')
    .digest('hex')
  return '"' + hash + '"'
}
