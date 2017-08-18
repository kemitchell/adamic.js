module.exports = function (array) {
  if (array.length === 0) {
    return ['empty array']
  } else {
    var errors = []
    array.forEach(function (component) {
      if (typeof component !== 'string') {
        errors.push('not a string: ' + JSON.stringify(component))
      } else if (component.trim().length === 0) {
        errors.push('invalid component: ' + JSON.stringify(component))
      }
    })
    return errors
  }
}
