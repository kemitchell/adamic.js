module.exports = function (objectSchema) {
  objectSchema.required = Object.keys(objectSchema.properties)
  objectSchema.additionalProperties = false
  return objectSchema
}
