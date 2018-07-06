var assert = require('assert')
var sodium = require('sodium-universal')
var stringify = require('json-stable-stringify')

module.exports = function (message) {
  assert.equal(typeof message, 'object', 'message must be an object')
  var digest = Buffer.alloc(sodium.crypto_hash_sha256_BYTES)
  sodium.crypto_hash_sha256(
    digest, Buffer.from(stringify(message), 'utf8')
  )
  return digest.toString('hex')
}
