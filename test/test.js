
var assert = require('assert')
var etag = require('..')

describe('etag(entity)', function () {
  describe('when "entity" is a string', function () {
    it('should generate an ETag', function () {
      assert.equal(etag('beep boop'), '"677e121b2436201ed8cc1ec73240a3ad"')
    })

    it('should work containing Unicode', function () {
      assert.equal(etag('论'), '"696f4778b4e4d98b7a95fef325812583"')
    })
  })

  describe('when "entity" is a Buffer', function () {
    it('should generate an ETag', function () {
      assert.equal(etag(new Buffer([1, 2, 3])), '"5289df737df57326fcdd22597afb1fac"')
    })
  })
})
