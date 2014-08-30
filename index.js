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
var Stats = require('fs').Stats

/**
 * Module variables.
 */

var NULL = new Buffer([0])

/**
 * Create a simple ETag.
 *
 * @param {string|Buffer|Stats} entity
 * @param {object} [options]
 * @param {boolean} [options.weak]
 * @return {String}
 * @api public
 */

function etag(entity, options) {
  if (entity == null) {
    throw new TypeError('argument entity is required')
  }

  // support fs.Stats object
  if (entity instanceof Stats) {
    return stattag(entity)
  }

  var isBuffer = Buffer.isBuffer(entity)
  if (!isBuffer && typeof entity !== 'string') {
    throw new TypeError('argument entity must be string or Buffer')
  }

  var weak = options && options.weak
  if (!isBuffer) entity = new Buffer(entity, 'utf8')

  return (weak ? 'W/' : '') + '"' + stronghash(entity) + '"'
}

/**
 * Generate a tag for a stat.
 *
 * @param {Buffer} entity
 * @return {String}
 * @api private
 */

function stattag(stat) {
  var mtime = stat.mtime.toISOString()
  var size = stat.size.toString(16)

  var hash = crypto
    .createHash('md5')
    .update('file', 'utf8')
    .update(NULL)
    .update(size, 'utf8')
    .update(NULL)
    .update(mtime, 'utf8')
    .digest('base64')

  return 'W/"' + hash + '"'
}

/**
 * Generate a strong hash.
 *
 * @param {Buffer} entity
 * @return {String}
 * @api private
 */

function stronghash(buf) {
  if (buf.length === 0) {
    // fast-path empty
    return '1B2M2Y8AsgTpgAmY7PhCfg=='
  }

  return crypto
    .createHash('md5')
    .update(buf)
    .digest('base64')
}
