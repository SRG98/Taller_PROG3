/*function logErrors(req, res, next) {
  console.error(err)
  next(err)
}*/

const logErrors = (err, req, res, next) => next(err)

function errorHandler(err, req, res, next) {
  res.status(400).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statuscode).json(output.payload)
  }
  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
