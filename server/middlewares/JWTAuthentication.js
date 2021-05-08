import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../env.js'

const JWTAuth = (req, res, next) => {
  const header = req.headers.authorization
  if (header) {
    const token = header.split(' ')[1]
    try {
      const res = jwt.verify(token, JWT_SECRET)
      req.auth = res
      return next()
    } catch {
      return res.status(400).json({ error: 'Invalid Token' })
    }
  }
  return res.status(401).json({ error: 'Not authenticated' })
}

export default JWTAuth
