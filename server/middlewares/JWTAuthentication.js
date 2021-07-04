import APIError from '../assets/APIError.js'
import TokenController from '../controllers/TokenController.js'

const JWTAuth = (req, res, next) => {
  const header = req.headers.authorization
  if (header) {
    const accessToken = header.split(' ')[1]
    const validatedData = TokenController.validate(accessToken)
    if (validatedData) {
      req.auth = validatedData
      return next()
    }
  }
  throw APIError.unauthorizedAccess()
}

export default JWTAuth
