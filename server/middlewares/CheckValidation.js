import { validationResult } from 'express-validator'
import fs from 'fs'

const validateBody = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
    return res.status(400).json({ errors: errors.array() })
  }
  return next()
}

export default validateBody
