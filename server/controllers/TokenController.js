import jwt from 'jsonwebtoken'
import { JWT_ACCESS, JWT_REFRESH } from '../env.js'
import Token from '../models/Token.js'

class TokenController {
  async generate(user) {
    const accessToken = jwt.sign(
      {
        username: user.email,
        level: user.level,
      },
      JWT_ACCESS,
      {
        expiresIn: '30m',
      }
    )
    const refreshToken = jwt.sign(
      {
        username: user.email,
        level: user.level,
      },
      JWT_REFRESH,
      {
        expiresIn: '1d',
      }
    )
    await this.reSave(refreshToken, user)
    return { accessToken, refreshToken }
  }

  async reSave(refreshToken, user) {
    const token = await Token.findOne({ user: user.id })
    if (token) {
      token.token = refreshToken
      return await token.save()
    }
    return await Token.create({ token: refreshToken, user: user.id })
  }
}

export default new TokenController()
