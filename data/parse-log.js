var AJV = require('ajv')
var ed25519 = require('ed25519')
var ndjson = require('ndjson')
var pumpify = require('pumpify')
var sha256 = require('sha256')
var stringify = require('json-stable-stringify')
var through2 = require('through2')

var ajv = new AJV()
ajv.addSchema('entry', require('../schemas/entry'))
ajv.addSchema('announce', require('../schemas/announce'))
var dataSchemas = ['adopt', 'attest', 'deidentify', 'identify', 'name']
dataSchemas.forEach(function (name) {
  ajv.addSchema(name, require('../schemas/' + name))
})

module.exports = function () {
  var publicKey, lastHash
  var first = true
  return pumpify(
    ndjson.parse({strict: true}),
    through2.obj(function (chunk, _, done) {
      ajv.validate('entry', chunk)
      if (ajv.errors) return failed('invalid entry')
      var data = chunk.data
      var signature = chunk.signature
      // The first entry in a log must be an announcement of
      // the Ed25519 public key.
      if (first) {
        ajv.validate('announce', data)
        if (ajv.errors) return failed('invalid announcement')
        publicKey = Buffer.from(data.key, 'hex')
      // After the first, announcement entry, each entry must link back
      // to the prior entry by hash and carry a valid data payload.
      } else {
        if (lastHash !== chunk.prior) {
          return failed('prior mismatch')
        }
        if (!isValidData(data)) {
          return failed('invalid data')
        }
      }
      // Every entry must be signed with the Ed25519 private key.
      if (!ed25519.Verify(
        Buffer.from(stringify(data), 'utf8'),
        Buffer.from(signature, 'hex'),
        publicKey
      )) {
        return failed('invalid signature')
      }
      first = false
      lastHash = sha256(stringify(chunk))
      done(null, data)

      function failed (message) {
        done(new Error(message))
      }
    })
  )

  function isValidData (data) {
    return dataSchemas.some(function (schema) {
      ajv.validate(schema, data)
      return ajv.errors === null
    })
  }
}
