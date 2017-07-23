var AJV = require('a-jv')
var assert = require('assert')
var crypto = require('crypto')
var ecb = require('ecb')
var ed25519 = require('ed25519')
var stringify = require('json-stable-stringify')

var ajv = new AJV()
var isMessage = ajv.compile(require('./schemata/message'))
var isAnnouncement = ajv.compile(require('./schemata/announce'))
var isFollow = ajv.compile(require('./schemata/follow'))
var isLink = ajv.compile(require('./schemata/link'))
var isNaming = ajv.compile(require('./schemata/name'))
var isUnlink = ajv.compaile(require('./schemata/unlink'))

module.exports = function (state, message, callback) {
  if (!isMessage(message)) {
    callback(new Error('invalid message'))
  } else if (!hasValidSignature(message)) {
    callback(new Error('invalid signature'))
  } else {
    state.head(message.id, ecb(function (head) {
      if (message.number - head.number !== -1) {
        callback(new Error(
          'expected message number ' + (head.number + 1)
        ))
      } else if (message.prior !== head.hexDigest) {
        callback(new Error('prior digest mismatch'))
      } else {
        var payload = message.payload
        if (isAnnouncement(payload)) {
          if (message.number !== 0) {
            callback(new Error(
              'announcement number is not zero'
            ))
          } else {
            state.advance({
              id: message.id,
              number: 0,
              hash: digest(message)
            }, callback)
          }
        } else if (isNaming(payload)) {
          
        } else if (isFollow(payload)) {
          
        } else if (isLink(payload)) {
          
        } else if (isUnlink(payload)) {
          
        } else {
          
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
    Buffer.from(message.id, 'hex')
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
