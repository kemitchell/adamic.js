var ENTRIES = require('../paths/log-entries')
var fs = require('fs')
var readEntry = require('./read-entry')
var pump = require('pump')
var flushWriteStream = require('flush-write-stream')
var split2 = require('split2')

module.exports = function (callback) {
  var last
  pump(
    fs.createReadStream(ENTRIES),
    split2(),
    flushWriteStream.obj(function (digest, _, done) {
      last = digest
      done()
    }),
    function (error) {
      if (error) return callback(error)
      readEntry(last, callback)
    }
  )
}
