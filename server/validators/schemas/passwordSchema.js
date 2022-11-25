const ajvInstance = require('../ajv-instance')

const schema = {
  type: 'object',
  properties: {
    password: {type: 'string', format: 'password', minLength: 3, maxLength: 8}
  },
  required: ['password'],
  additionalProperties: false
}

module.exports = ajvInstance.compile(schema)