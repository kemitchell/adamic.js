var URLS = require('../paths/urls')
var fs = require('fs')

module.exports = function (callback) {
  fs.readFile(URLS, 'utf8', function (error, list) {
    if (error) {
      if (error.code === 'ENOENT') {
        callback(null, [])
      } else {
        callback(error)
      }
    } else {
      callback(null, list.split('\n'))
    }
  })
}
