const ApiError = require('../exceptions/api-error')

function validateDto(ajvValidate) {
  return (req, res, next) => {
    console.log(req.body)
    const valid = ajvValidate(req.body)
    // console.log(valid)
    if (!valid) {
      const errors = ajvValidate.errors;
      return next(ApiError.BadRequest('Validation error', errors))
      // res.status(400).json(errors)
    }
    next()
  }
}

module.exports = validateDto