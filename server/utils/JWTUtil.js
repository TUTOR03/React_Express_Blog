import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_REFRESH } from '../env.js'
import Token from '../models/Token.js'

export const generateToken = async (user) => {
  const accessToken = jwt.sign(
    { username: user.username, level: user.level },
    JWT_SECRET,
    { expiresIn: '30m' }
  )
  const refreshToken = jwt.sign(
    { username: user.username, level: user.level },
    JWT_SECRET,
    { expiresIn: '1d' }
  )
  oldRefreshToken = await Token.findOne({ user: user.id })
  if (oldRefreshToken) {
    oldRefreshToken.token = refreshToken
    await oldRefreshToken.save()
  } else {
    await Token.create({ user: user.id, token: refreshToken })
  }
  return { accessToken, refreshToken }
}
