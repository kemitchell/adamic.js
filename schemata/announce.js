var nonce = require('./common/nonce')
var publicKey = require('./common/public-key')
var signature = require('./common/signature')

module.exports = {
  title: 'announcement message',
  type: 'object',
  properties: {publicKey, nonce, signature},
  additionalProperties: false
}

module.exports.required = Object.keys(module.exports.properties)
