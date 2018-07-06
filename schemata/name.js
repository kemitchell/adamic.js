var name = require('./common/name')
var strict = require('./strict')
var string = require('./common/string')

module.exports = strict({
  type: 'object',
  properties: {
    type: {const: 'name'},
    key: string,
    space: string,
    name
  }
})
