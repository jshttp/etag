
/**
 * Module dependencies.
 */

var benchmark = require('benchmark')
var benchmarks = require('beautify-benchmark')
var Buffer = require('safe-buffer').Buffer
var seedrandom = require('seedrandom')

/**
 * Globals for benchmark.js
 */

global.buffer = getbuffer(100 * 1000)
global.etag = require('..')
global.string = getbuffer(100 * 1000).toString()

var suite = new benchmark.Suite()

suite.add({
  name: 'buffer - strong',
  minSamples: 100,
  fn: 'var val = etag(buffer, {weak: false})'
})

suite.add({
  name: 'buffer - weak',
  minSamples: 100,
  fn: 'var val = etag(buffer, {weak: true})'
})

suite.add({
  name: 'string - strong',
  minSamples: 100,
  fn: 'var val = etag(string, {weak: false})'
})

suite.add({
  name: 'string - weak',
  minSamples: 100,
  fn: 'var val = etag(string, {weak: true})'
})

suite.on('start', function onCycle (event) {
  process.stdout.write('  100KB body\n\n')
})

suite.on('cycle', function onCycle (event) {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete () {
  benchmarks.log()
})

suite.run({ async: false })

function getbuffer (size) {
  var buffer = Buffer.alloc(size)
  var rng = seedrandom('body ' + size)

  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = (rng() * 94 + 32) | 0
  }

  return buffer
}
