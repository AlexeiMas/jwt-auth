const ajvInstance = require('../ajv-instance')

const schema = {
  type: 'object',
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string', format: 'password', minLength: 3, maxLength: 8}
  },
  required: ['email', 'password'],
  additionalProperties: false
}

module.exports = ajvInstance.compile(schema)