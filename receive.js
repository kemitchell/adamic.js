var AJV = require('a-jv')
var assert = require('assert')
var crypto = require('crypto')
var ecb = require('ecb')
var ed25519 = require('ed25519')
var stringify = require('json-stable-stringify')

var ajv = new AJV()
var isEntry = ajv.compile(require('./schemata/entry'))
var isFollow = ajv.compile(require('./schemata/follow'))
var isNaming = ajv.compile(require('./schemata/name'))
var isLink = ajv.compile(require('./schemata/link'))
var isUnlink = ajv.compaile(require('./schemata/unlink'))

module.exports = function (state, message, callback) {
  if (!isMessage(message)) {
    callback(new Error('invalid message'))
  } else if (!hasValidSignature(message)) {
    callback(new Error('invalid signature'))
  } else {
    state.head(message.id, ecb(function (head) {
      if (message.prior !== head) {
        callback(new Error('prior digest mismatch'))
      } else {
        var payload = message.payload
        if (!payload.hasOwnProperty('payload')) {
          state.advance({
            key: message.key,
            hash: digest(message)
          }, callback)
        } else if (isNaming(payload)) {
          
        } else if (isFollow(payload)) {
          
        } else if (isLink(payload)) {
          
        } else if (isUnlink(payload)) {
          
        } else {
          callback(new Error('invalid payload'))
        }
      }
    }))
  }
}

function hasValidSignature (message) {
  assert(isMessage(message))
  var signed = objectWithout(message, 'signature')
  return ed25519.Verify(
    Buffer.from(stringify(signed), 'utf8'),
    Buffer.from(message.signature, 'hex'),
    Buffer.from(message.key, 'hex')
  )
}

function objectWithout (object, without) {
  assert(typeof object === 'object')
  assert(object.hasOwnProperty(without))
  var returned = {}
  Object.keys(object).forEach(function (key) {
    if (key !== without) {
      returned[key] = object[key]
    }
  })
  return returned
}

function digest (message) {
  assert(isMessage(message))
  return crypto
    .createHash('sha256')
    .update(stringify(message))
    .digest('hex')
}
