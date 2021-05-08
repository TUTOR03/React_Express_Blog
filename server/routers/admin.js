import express from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { JWT_SECRET, INVITE_CODE } from '../env.js'
import User from '../models/User.js'
import Invite from '../models/Invitation.js'
import validateBody from '../middlewares/CheckValidation.js'

const router = express.Router()

router.post(
  '/login',
  body('username').exists().isLength({ min: 5 }).trim().escape(),
  body('password').exists().isLength({ min: 8 }).trim().escape(),
  validateBody,
  async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (user && user?.validateUserPass(password)) {
      const newJWT = jwt.sign(
        { username: user.username, level: user.level },
        JWT_SECRET,
        {
          expiresIn: '2h',
        }
      )
      return res.status(200).json({ token: newJWT })
    }
    return res.status(400).json({ error: "username or password isn't valid" })
  }
)

router.post(
  '/register',
  body('username').exists().isLength({ min: 5 }).trim().escape(),
  body('password')
    .exists()
    .isStrongPassword({ minUppercase: 0 })
    .trim()
    .escape(),
  body('invite').exists().trim().escape(),
  validateBody,
  async (req, res) => {
    const { username, password, invite } = req.body
    if (await User.exists({ username })) {
      return res.status(409).json({
        error: 'User already exists',
      })
    }
    if (!(await Invite.exists({ code: INVITE_CODE }))) {
      const main_invite = new Invite({ code: INVITE_CODE, level: 1 })
      await main_invite.save()
    }
    if (!(await Invite.exists({ code: invite, used: false }))) {
      return res.status(400).json({ error: 'Invalid invitation code' })
    }
    const temp_invite = await Invite.findOne({ code: invite })
    const user = new User({ username, password, level: temp_invite.level })
    temp_invite.used = true
    temp_invite.user = user.id
    await temp_invite.save()
    await user.save()
    return res.status(200).json({ username, password })
  }
)

export default router
