{
  "title": "log entry",
  "type": "object",
  "properties": {
    "oneOf": [
      {
        "title": "payload-bearing message",
        "type": "object",
        "properties": {
          "key": {
            "$ref": "#/definitions/64hex"
          },
          "prior": {
            "$ref": "#/definitions/64hex"
          },
          "payload": {
            "type": "object"
          },
          "signature": {
            "$ref": "#/definitions/128hex"
          }
        },
        "required": [
          "key",
          "prior",
          "payload",
          "signature"
        ]
      },
      {
        "title": "announcement message",
        "type": "object",
        "properties": {
          "key": {
            "$ref": "#/definitions/64hex"
          },
          "signature": {
            "$ref": "#/definitions/128hex"
          }
        },
        "required": [
          "key",
          "signature"
        ]
      }
    ]
  },
  "additionaProperties": false,
  "definitions": {
    "64hex": {
      "type": "string",
      "pattern": "[0-9a-f]{64}"
    },
    "128hex": {
      "type": "string",
      "pattern": "[0-9a-f]{128}"
    }
  }
}
