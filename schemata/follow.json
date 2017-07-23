{
  "type": "object",
  "properties": {
    "type": {
      "const": "follow"
    },
    "id": {
      "type": "string",
      "pattern": "[0-9a-f]{64}"
    },
    "source": {
      "$ref": "#/definitions/name"
    },
    "target": {
      "$ref": "#/definitions/name"
    }
  },
  "required": [
    "type",
    "id",
    "source",
    "target"
  ],
  "additionaProperties": false,
  "definitions": {
    "name": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string",
        "minLength": 1,
        "pattern": "^[^\\s].*[^\\s]$"
      }
    }
  }
}
