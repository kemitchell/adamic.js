var name = require('./common/name')
var strict = require('./strict')
var string = require('./common/string')

module.exports = strict({
  type: 'object',
  properties: {
    type: {const: 'name'},
    id: string,
    space: string,
    name
  }
})
