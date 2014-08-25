
var assert = require('assert')
var etag = require('..')

describe('etag(entity)', function () {
  it('should require an entity', function () {
    assert.throws(etag.bind(), /argument entity is required/)
  })

  describe('when "entity" is a string', function () {
    it('should generate an ETag', function () {
      assert.equal(etag('beep boop'), '"Z34SGyQ2IB7YzB7HMkCjrQ=="')
    })

    it('should work containing Unicode', function () {
      assert.equal(etag('论'), '"aW9HeLTk2Yt6lf7zJYElgw=="')
    })

    it('should work for empty string', function () {
      assert.equal(etag(''), '"1B2M2Y8AsgTpgAmY7PhCfg=="')
    })
  })

  describe('when "entity" is a Buffer', function () {
    it('should generate an ETag', function () {
      assert.equal(etag(new Buffer([1, 2, 3])), '"Uonfc331cyb83SJZevsfrA=="')
    })

    it('should work for empty Buffer', function () {
      assert.equal(etag(new Buffer(0)), '"1B2M2Y8AsgTpgAmY7PhCfg=="')
    })
  })
})
