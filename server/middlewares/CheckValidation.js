import { validationResult } from 'express-validator'
import APIError from '../assets/APIError.js'

const validateBody = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // if (req.file) {
    //   fs.unlinkSync(req.file.path)
    // }
    throw APIError.create(400, 'Incorrect data', errors)
  }
  return next()
}

export default validateBody
