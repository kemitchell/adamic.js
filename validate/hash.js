module.exports = function (string) {
  return string === 'SHA-256' ? [] : ['invalid hash: ' + string]
}
