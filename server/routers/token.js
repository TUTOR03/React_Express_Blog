import { Router } from 'express'
import TokenController from '../controllers/TokenController.js'

const router = Router()

router.post('/refresh', async (req, res, next) => {
  try {
    const tokens = await TokenController.refresh(req.cookies.refreshToken)
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    return res.status(200).json({ accessToken: tokens.accessToken })
  } catch (err) {
    return next(err)
  }
})

export default router
