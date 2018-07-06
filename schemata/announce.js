var nonce = require('./common/nonce')
var publicKey = require('./common/public-key')
var signature = require('./common/signature')
var strict = require('./strict')

module.exports = strict({
  title: 'announcement message',
  type: 'object',
  properties: {publicKey, nonce, signature}
})
