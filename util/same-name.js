module.exports = function (a, b) {
  return (
    a.length === b.length &&
    a.every(function (element, index) {
      return element === b[index]
    })
  )
}
