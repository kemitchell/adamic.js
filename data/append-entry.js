var ENTRIES = require('../paths/log-entries')
var LOG = require('../paths/log')
var ecb = require('ecb')
var ed25519 = require('ed25519')
var fs = require('fs')
var path = require('path')
var readKeys = require('../data/read-keys')
var readLastEntry = require('./read-last-entry')
var runSeries = require('run-series')
var sha256 = require('../util/sha256')
var stringify = require('json-stable-stringify')

module.exports = function (entry, callback) {
  readKeys(ecb(callback, function (keys) {
    readLastEntry(ecb(callback, function (priorEntry) {
      var priorDigest = sha256(stringify(priorEntry))
      var signature = ed25519.Sign(
        Buffer.from(stringify(entry), 'utf8'),
        keys.private
      )
      var json = stringify({
        prior: priorDigest,
        entry: entry,
        signature: signature.toString('hex')
      })
      var nextDigest = sha256(json)
      runSeries([
        function (done) {
          fs.writeFile(path.join(LOG, nextDigest), json, done)
        },
        function (done) {
          fs.appendFile(ENTRIES, nextDigest + '\n', done)
        }
      ], function (error) {
        if (error) {
          console.error(error)
          process.exit(1)
        }
        process.exit(0)
      })
    }))
  }))
}
