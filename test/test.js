
var assert = require('assert')
var etag = require('..')
var fs = require('fs')

describe('etag(entity)', function () {
  it('should require an entity', function () {
    assert.throws(etag.bind(), /argument entity is required/)
  })

  it('should reject number entities', function () {
    assert.throws(etag.bind(null, 4), /argument entity must be/)
  })

  describe('when "entity" is a string', function () {
    it('should generate a strong ETag', function () {
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
    it('should generate a strong ETag', function () {
      assert.equal(etag(new Buffer([1, 2, 3])), '"Uonfc331cyb83SJZevsfrA=="')
    })

    it('should work for empty Buffer', function () {
      assert.equal(etag(new Buffer(0)), '"1B2M2Y8AsgTpgAmY7PhCfg=="')
    })
  })

  describe('when "entity" is a fs.Stats', function () {
    it('should generate a weak ETag', function () {
      assert.ok(isweak(etag(fs.statSync(__filename))))
    })

    it('should generate consistently', function () {
      assert.equal(etag(fs.statSync(__filename)), etag(fs.statSync(__filename)))
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

      it('should generate a strong ETag for fs.Stats', function () {
        assert.ok(!isweak(etag(fs.statSync(__filename), {weak: false})))
      })
    })

    describe('when "true"', function () {
      it('should generate a weak ETag for a string', function () {
        assert.equal(etag('beep boop', {weak: true}), 'W/"9-7f3ee715"')
      })

      it('should generate a weak ETag for a Buffer', function () {
        assert.equal(etag(new Buffer([1, 2, 3]), {weak: true}), 'W/"3-55bc801d"')
      })

      it('should generate a weak ETag for fs.Stats', function () {
        assert.ok(isweak(etag(fs.statSync(__filename), {weak: true})))
      })
    })
  })
})

function isweak(etag) {
  var weak = /^(W\/|)"([^"]+)"/.exec(etag)

  if (weak === null) {
    throw new Error('invalid ETag: ' + etag)
  }

  return weak[1] === 'W/'
}
