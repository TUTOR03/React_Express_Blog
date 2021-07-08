import multer from 'multer'
import APIError from '../assets/APIError.js'

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
  }
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: 'Wrong file extension or no file',
    })
  }
  return res.status(500).json({ message: 'Unpredictable error' })
}

export default errorHandler
