module.exports = function errorHandler(err, req, res, next) {
  console.error('[error]', err.message)

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ message: 'Validation error', errors })
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value' })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' })
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
