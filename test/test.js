
var assert = require('assert')
var etag = require('..')

describe('etag(entity)', function () {
  it('should require an entity', function () {
    assert.throws(etag.bind(), /argument entity is required/)
  })

  it('should reject number entities', function () {
    assert.throws(etag.bind(null, 4), /argument entity must be/)
  })

  describe('when "entity" is a string', function () {
    it('should generate a weak ETag', function () {
      assert.equal(etag('beep boop'), 'W/"9-7f3ee715"')
    })

    it('should work containing Unicode', function () {
      assert.equal(etag('论'), 'W/"3-438093ff"')
    })

    it('should work for empty string', function () {
      assert.equal(etag(''), 'W/"0-0"')
    })
  })

  describe('when "entity" is a Buffer', function () {
    it('should generate a strong ETag', function () {
      assert.equal(etag(new Buffer([1, 2, 3])), '"Uonfc331cyb83SJZevsfrA=="')
    })

    it('should work for empty Buffer', function () {
      assert.equal(etag(new Buffer(0)), '"1B2M2Y8AsgTpgAmY7PhCfg=="')
    })
  })

  describe('with "weak" option', function () {
    describe('when "false"', function () {
      it('should generate a strong ETag for a string', function () {
        assert.equal(etag('beep boop', {weak: false}), '"Z34SGyQ2IB7YzB7HMkCjrQ=="')
      })

      it('should generate a strong ETag for a Buffer', function () {
        assert.equal(etag(new Buffer([1, 2, 3]), {weak: false}), '"Uonfc331cyb83SJZevsfrA=="')
      })
    })

    describe('when "true"', function () {
      it('should generate a strong ETag for a string', function () {
        assert.equal(etag('beep boop', {weak: true}), 'W/"9-7f3ee715"')
      })

      it('should generate a strong ETag for a Buffer', function () {
        assert.equal(etag(new Buffer([1, 2, 3]), {weak: true}), 'W/"3-55bc801d"')
      })
    })
  })
})
