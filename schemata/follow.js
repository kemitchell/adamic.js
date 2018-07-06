var name = require('./common/name')
var publicKey = require('./common/public-key')
var strict = require('./strict')

module.exports = strict({
  type: 'object',
  properties: {
    type: {const: 'follow'},
    publicKey,
    source: name,
    target: name
  }
})
