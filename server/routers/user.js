import { Router } from 'express'
import { body } from 'express-validator'
import validateBody from '../middlewares/CheckValidation.js'
import UserController from '../controllers/UserController.js'

const router = Router()

router.post(
  '/register',
  body('email').exists().isEmail().normalizeEmail().trim().escape(),
  body('password')
    .exists()
    .isStrongPassword({ minUppercase: 0 })
    .trim()
    .escape(),
  body('invite').exists().trim().escape(),
  validateBody,
  async (req, res, next) => {
    try {
      await UserController.register(
        req.body.email,
        req.body.password,
        req.body.invite
      )
      return res.status(200).json({})
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  '/login',
  body('email').exists().isEmail().normalizeEmail().trim().escape(),
  body('password').exists().trim().escape(),
  validateBody,
  async (req, res, next) => {
    try {
      const tokens = await UserController.login(
        req.body.email,
        req.body.password
      )
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(200).json({ accessToken: tokens.accessToken })
    } catch (err) {
      return next(err)
    }
  }
)

export default router
