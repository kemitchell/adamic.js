var assert = require('assert')
var sodium = require('sodium-universal')
var stringify = require('json-stable-stringify')

module.exports = function (secretKey, payload) {
  assert.equal(typeof publicKey, 'string', 'secretKey must be a string')
  assert.equal(typeof payload, 'object', 'payload must be an object')
  var signature = Buffer.alloc(64)
  sodium.crypto_sign_detached(
    signature,
    Buffer.from(stringify(payload), 'utf8'),
    Buffer.from(secretKey, 'hex')
  )
  return signature.toString('hex')
}
