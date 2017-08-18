var MAPPING = require('../paths/mapping')
var fs = require('fs')
var parse = require('json-parse-errback')

module.exports = function (callback) {
  fs.readFile(MAPPING, 'utf8', function (error, list) {
    if (error) {
      if (error.code === 'ENOENT') {
        callback(null, [])
      } else {
        callback(error)
      }
    } else {
      var mappings = []
      list
        .split('\n')
        .forEach(function (line) {
          parse(line, function (error, parsed) {
            if (!error) {
              mappings.push(parsed)
            }
          })
        })
      callback(null, mappings)
    }
  })
}
