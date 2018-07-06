var entry = require('./common/entry')
var publicKey = require('./common/public-key')
var signature = require('./common/signature')
var strict = require('./strict')

module.exports = strict({
  title: 'log entry',
  type: 'object',
  properties: {
    publicKey,
    prior: entry,
    payload: {type: 'object'},
    signature
  }
})
