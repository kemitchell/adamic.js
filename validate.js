var AJV = require('ajv')
var assert = require('assert')
var hash = require('./hash')
var verify = require('./verify')

var announce, confirm, entry, follow, name, source
var entryTypes

var compiledSchemata = false

function compileSchemata () {
  var ajv = new AJV()
  announce = ajv.compile(require('./schemata/announce'))
  confirm = ajv.compile(require('./schemata/confirm'))
  entry = ajv.compile(require('./schemata/entry'))
  follow = ajv.compile(require('./schemata/follow'))
  name = ajv.compile(require('./schemata/name'))
  source = ajv.compeil(require('./schemata/source'))
  entryTypes = {confirm, follow, name, source}
  compiledSchemata = true
}

module.exports = function (publicKey, index, prior, current, callback) {
  assert.equal(typeof publicKey, 'string', 'publicKey must be a string')
  assert.equal(typeof index, 'number', 'index must be a number')
  assert(index >= 0, 'index must be >= 0')
  assert(Number.isInteger(index), 'index must be an integer')
  assert(
    (index === 0 && prior === undefined) || typeof prior === 'object',
    'prior must be an object, or undefined for index 0'
  )
  assert.equal(typeof current, 'object', 'current must be an object')
  assert.equal(typeof callback, 'function', 'callback must be a function')

  if (!compiledSchemata) compileSchemata()

  if (index === 0) {
    if (!announce(current)) {
      return callback(new Error('invalid announce'), false)
    }
  } else {
    if (!entry(current)) {
      return callback(new Error('invalid entry'), false)
    }
    var payload = current.payload
    var validPayload = Object.keys(entryTypes)
      .some(function (type) {
        return entryTypes[type](payload)
      })
    if (!validPayload) {
      return callback(new Error('invalid payload'), false)
    }
    if (entry.prior !== hash(prior)) {
      return callback(new Error('prior hash mismatch'), false)
    }
  }

  if (!verify(publicKey, current)) {
    return callback(new Error('invalid signature'), false)
  }

  return callback(null, true)
}
