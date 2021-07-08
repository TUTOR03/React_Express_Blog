import APIError from '../assets/APIError.js'
import { INVITE_CODE } from '../env.js'
import Invite from '../models/Invite.js'
import { v4 as uuidv4 } from 'uuid'
import User from '../models/User.js'

class InviteController {
  async generate(level, username) {
    const user = await User.findOne({ email: username })
    const invite = await Invite.create({
      code: uuidv4(),
      level,
      created: new Date().getTime(),
      creator: user.id,
    })
    return invite.code
  }

  async check(invite) {
    await this.checkMain()
    if (!(await Invite.exists({ code: invite }))) {
      throw APIError(400, 'Invalid invite code')
    }
  }

  async use(invite_code, user) {
    const invite = await Invite.findOne({ code: invite_code })
    invite.user = user.id
    invite.used = true
    user.level = invite.level
    await invite.save()
    await user.save()
  }

  async checkMain() {
    if (!(await Invite.exists({ code: INVITE_CODE }))) {
      await Invite.create({ code: INVITE_CODE, level: 1 })
    }
  }
}

export default new InviteController()
