import APIError from '../assets/APIError.js'

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Unpredictable error' })
}

export default errorHandler
