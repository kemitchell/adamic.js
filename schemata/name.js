{
  "type": "object",
  "properties": {
    "type": {
      "const": "name"
    },
    "key": {
      "type": "string",
      "pattern": "[0-9a-f]{64}"
    },
    "space": {
      "$ref": "#/definitions/string"
    },
    "name": {
      "$ref": "#/definitions/name"
    }
  },
  "required": [
    "type",
    "key",
    "space",
    "name"
  ],
  "additionaProperties": false,
  "definitions": {
    "name": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/string"
      }
    },
    "string": {
      "type": "string",
      "minLength": 1,
      "pattern": "^[^\\s].*[^\\s]$"
    }
  }
}
