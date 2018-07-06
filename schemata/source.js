var publicKey = require('./common/public-key')
var strict = require('./strict')

module.exports = strict({
  type: 'object',
  properties: {
    type: {const: 'source'},
    publicKey,
    uri: {type: 'string', pattern: 'uri'}
  }
})
