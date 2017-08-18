var ENTRIES = require('../paths/log-entries')
var KEYS = require('../paths/keys')
var LOG = require('../paths/log')
var crypto = require('crypto')
var ecb = require('ecb')
var ed25519 = require('ed25519')
var fs = require('fs')
var parse = require('json-parse-errback')
var path = require('path')
var runSeries = require('run-series')
var sha256 = require('../util/sha256')
var stringify = require('json-stable-stringify')

module.exports = function (callback) {
  fs.readFile(KEYS, function (error, buffer) {
    if (error) {
      if (error.code === 'ENOENT') {
        var seed = crypto.randomBytes(32)
        var keypair = ed25519.MakeKeypair(seed)
        runSeries([
          function (done) {
            fs.writeFile(KEYS, JSON.stringify({
              public: keypair.publicKey.toString('hex'),
              private: keypair.privateKey.toString('hex')
            }), done)
          },
          function (done) {
            var entry = {
              date: new Date().toISOString(),
              public: keypair.publicKey.toString('hex')
            }
            var signature = ed25519.Sign(
              Buffer.from(stringify(entry), 'utf8'),
              keypair
            )
            var json = stringify({
              entry: entry,
              signature: signature.toString('hex')
            })
            var digest = sha256(json)
            runSeries([
              function (done) {
                mkdirp(LOG, done)
              },
              function (done) {
                fs.writeFile(path.join(LOG, digest), json, done)
              },
              function (done) {
                fs.writeFile(ENTRIES, digest + '\n', done)
              }
            ], done)
          }
        ], ecb(callback, function () {
          callback(null, {
            public: keypair.publicKey,
            private: keypair.privateKey
          })
        }))
      } else {
        callback(error)
      }
    } else {
      parse(buffer, ecb(callback, function (parsed) {
        callback(null, {
          public: Buffer.from(parsed.public, 'hex'),
          private: Buffer.from(parsed.private, 'hex')
        })
      }))
    }
  })
}
