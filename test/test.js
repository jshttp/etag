
var assert = require('assert')
var etag = require('..')

describe('etag(entity)', function () {
  describe('when "entity" is a string', function () {
    it('should generate an ETag', function () {
      assert.equal(etag('beep boop'), '"Z34SGyQ2IB7YzB7HMkCjrQ=="')
    })

    it('should work containing Unicode', function () {
      assert.equal(etag('论'), '"aW9HeLTk2Yt6lf7zJYElgw=="')
    })
  })

  describe('when "entity" is a Buffer', function () {
    it('should generate an ETag', function () {
      assert.equal(etag(new Buffer([1, 2, 3])), '"Uonfc331cyb83SJZevsfrA=="')
    })
  })
})
