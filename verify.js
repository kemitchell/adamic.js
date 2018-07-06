var assert = require('assert')
var sodium = require('sodium-universal')
var stringify = require('json-stable-stringify')

module.exports = function (publicKey, entry) {
  assert(typeof publicKey, 'string', 'publicKey must be a string')
  assert(typeof entry, 'object', 'entry must be an object')
  return sodium.crypto_sign_verify_detached(
    Buffer.from(entry.signature, 'hex'),
    Buffer.from(stringify(objectWithout(entry, 'signature'))),
    Buffer.from(publicKey, 'hex')
  )
}

function objectWithout (object, without) {
  assert(typeof object === 'object')
  assert(object.hasOwnProperty(without))
  var returned = {}
  Object.keys(object).forEach(function (key) {
    if (key !== without) returned[key] = object[key]
  })
  return returned
}
