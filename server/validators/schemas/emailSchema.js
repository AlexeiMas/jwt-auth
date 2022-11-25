const ajvInstance = require('../ajv-instance')

const schema = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email'},
  },
  required: ['email'],
  additionalProperties: false
}

module.exports = ajvInstance.compile(schema)