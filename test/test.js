
var assert = require('assert')
var etag = require('..')
var fs = require('fs')
var seedrandom = require('seedrandom')

var buf5kb = getbuffer(5 * 1024)
var str5kb = getbuffer(5 * 1024).toString()

describe('etag(entity)', function () {
  it('should require an entity', function () {
    assert.throws(etag.bind(), /argument entity is required/)
  })

  it('should reject number entities', function () {
    assert.throws(etag.bind(null, 4), /argument entity must be/)
  })

  describe('when "entity" is a string', function () {
    it('should generate a strong ETag', function () {
      assert.equal(etag('beep boop'), '"9-Z34SGyQ2IB7YzB7HMkCjrQ"')
    })

    it('should work containing Unicode', function () {
      assert.equal(etag('论'), '"3-aW9HeLTk2Yt6lf7zJYElgw"')
      assert.equal(etag('论', {weak: true}), 'W/"3-aW9HeLTk2Yt6lf7zJYElgw"')
    })

    it('should work for empty string', function () {
      assert.equal(etag(''), '"0-1B2M2Y8AsgTpgAmY7PhCfg"')
    })
  })

  describe('when "entity" is a Buffer', function () {
    it('should generate a strong ETag', function () {
      assert.equal(etag(new Buffer([1, 2, 3])), '"3-Uonfc331cyb83SJZevsfrA"')
    })

    it('should work for empty Buffer', function () {
      assert.equal(etag(new Buffer(0)), '"0-1B2M2Y8AsgTpgAmY7PhCfg"')
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

  describe('when "entity" looks like a stats object', function () {
    it('should generate a weak ETag', function () {
      var fakeStat = {
        ctime: new Date('2014-09-01T14:52:07Z'),
        mtime: new Date('2014-09-01T14:52:07Z'),
        ino: 0,
        size: 3027
      }
      assert.equal(etag(fakeStat), 'W/"bd3-14831b399d8"')
    })
  })

  describe('with "weak" option', function () {
    describe('when "false"', function () {
      it('should generate a strong ETag for a string', function () {
        assert.equal(etag('', {weak: false}), '"0-1B2M2Y8AsgTpgAmY7PhCfg"')
        assert.equal(etag('beep boop', {weak: false}), '"9-Z34SGyQ2IB7YzB7HMkCjrQ"')
        assert.equal(etag(str5kb, {weak: false}), '"1400-8Kq68cJq4i+5US7RLWrE1g"')
      })

      it('should generate a strong ETag for a Buffer', function () {
        assert.equal(etag(new Buffer(0), {weak: false}), '"0-1B2M2Y8AsgTpgAmY7PhCfg"')
        assert.equal(etag(new Buffer([1, 2, 3]), {weak: false}), '"3-Uonfc331cyb83SJZevsfrA"')
        assert.equal(etag(buf5kb, {weak: false}), '"1400-8Kq68cJq4i+5US7RLWrE1g"')
      })

      it('should generate a strong ETag for fs.Stats', function () {
        assert.ok(!isweak(etag(fs.statSync(__filename), {weak: false})))
      })
    })

    describe('when "true"', function () {
      it('should generate a weak ETag for a string', function () {
        assert.equal(etag('', {weak: true}), 'W/"0-1B2M2Y8AsgTpgAmY7PhCfg"')
        assert.equal(etag('beep boop', {weak: true}), 'W/"9-Z34SGyQ2IB7YzB7HMkCjrQ"')
        assert.equal(etag(str5kb, {weak: true}), 'W/"1400-8Kq68cJq4i+5US7RLWrE1g"')
      })

      it('should generate a weak ETag for a Buffer', function () {
        assert.equal(etag(new Buffer(0), {weak: true}), 'W/"0-1B2M2Y8AsgTpgAmY7PhCfg"')
        assert.equal(etag(new Buffer([1, 2, 3]), {weak: true}), 'W/"3-Uonfc331cyb83SJZevsfrA"')
        assert.equal(etag(buf5kb, {weak: true}), 'W/"1400-8Kq68cJq4i+5US7RLWrE1g"')
      })

      it('should generate a weak ETag for fs.Stats', function () {
        assert.ok(isweak(etag(fs.statSync(__filename), {weak: true})))
      })

      it('should generate different ETags for different strings', function () {
        assert.notEqual(etag('plumless', {weak: true}), etag('buckeroo', {weak: true}))
      })
    })
    
    describe('etag option', function () {
        it('etag option should have priority over weak setting', function () {
            assert.ok(!isweak(etag(fs.statSync(__filename), {etag: 'strong'})))
        })
        
        it('etag option should have priority over weak setting', function () {
            assert.ok(isweak(etag(fs.statSync(__filename), {etag: 'weak'})))
        })
        
        it('etag option custom function', function () {
            assert.equal(etag(fs.statSync(__filename), {etag: function(body){return 'hello'}}), 'hello')
        })
    })
  })
})

function getbuffer(size) {
  var buffer = new Buffer(size)
  var rng = seedrandom('etag test')

  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = (rng() * 94 + 32) | 0
  }

  return buffer
}

function isweak(etag) {
  var weak = /^(W\/|)"([^"]+)"/.exec(etag)

  if (weak === null) {
    throw new Error('invalid ETag: ' + etag)
  }

  return weak[1] === 'W/'
}
