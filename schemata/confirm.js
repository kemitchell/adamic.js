var entry = require('./common/entry')
var publicKey = require('./common/public-key')
var strict = require('./strict')

module.exports = strict({
  type: 'object',
  properties: {
    type: {const: 'confirm'},
    publicKey,
    entry
  }
})
