var LOG = require('../paths/log')
var ecb = require('ecb')
var fs = require('fs')
var parse = require('json-parse-errback')
var path = require('path')

module.exports = function (digest, callback) {
  var file = path.join(LOG, digest)
  fs.readFile(file, ecb(callback, function (buffer) {
    parse(buffer, callback)
  }))
}
