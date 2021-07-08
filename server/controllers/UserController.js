import APIError from '../assets/APIError.js'
import User from '../models/User.js'
import Invitecontroller from './InviteController.js'
import crypto from 'crypto'
import { PASS_SECRET } from '../env.js'
import TokenController from './TokenController.js'

class UserController {
  async register(email, password, invite) {
    if (await User.exists({ email })) {
      throw APIError(400, 'User already exists')
    }
    await Invitecontroller.check(invite)
    const user = await User.create({
      email,
      password: await this.hashPassword(password, email),
    })
    await Invitecontroller.use(invite, user)
  }

  async hashPassword(password, salt) {
    const hash = crypto.createHmac('sha256', PASS_SECRET)
    hash.update(`${salt}${password}`)
    return hash.digest('hex')
  }

  async checkPassword(password, user) {
    return user.password == (await this.hashPassword(password, user.email))
  }

  async login(email, password) {
    const user = await User.findOne({ email })
    if (!user) {
      throw APIError(400, "User doesn't exist")
    }
    if (!(await this.checkPassword(password, user))) {
      throw APIError(400, 'Invalid password or username')
    }
    return await TokenController.generate(user)
  }

  async logout() {
    try {
    } catch (e) {}
  }
}

export default new UserController()
