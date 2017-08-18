var NAME = require('../package.json').name
var path = require('path')
var xdgBasedir = require('xdg-basedir')

module.exports = path.join(xdgBasedir.data, NAME)
