module.exports = function (hash, digest) {
  if (hash === 'SHA-256') {
    return /^[0-9a-f]{64}$/.test(digest)
      ? []
      : ['invalid SHA-256 digest']
  } else {
    return ['invalid hash: ' + hash]
  }
}
