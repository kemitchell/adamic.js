var entry = require('./common/entry')
var signature = require('./common/signature')
var strict = require('./strict')

module.exports = strict({
  title: 'log entry',
  type: 'object',
  properties: {
    prior: entry,
    payload: {type: 'object'},
    signature
  }
})
