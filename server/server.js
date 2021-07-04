import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import { PORT } from './env.js'
import cookieParser from 'cookie-parser'

// app.use('/media', express.static('media'))

// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({
//       error: 'Wrong file or file is undefined',
//     })
//   }
//   return err && next(err)
// })

import userRouter from './routers/user.js'
import tokenRouter from './routers/token.js'
import inviteRouter from './routers/invite.js'

import errorHandler from './middlewares/ErrorHandler.js'
import JWTAuth from './middlewares/JWTAuthentication.js'
import LevelAccess from './middlewares/LevelAcess.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))

app.use('/user', userRouter)
app.use('/token', tokenRouter)
app.use('/invite', inviteRouter)

app.get('/test', JWTAuth, LevelAccess(1), (req, res) => {
  return res.status(200).json({})
})

app.use(errorHandler)

// app.use((req, res) => {
//   console.log('404 NOT FOUND')
//   return res.status(404).json({})
// })

mongoose.connect('mongodb://localhost/my_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

mongoose.connection
  .once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`)
    })
  })
  .on('error', (error) => {
    console.log('mongoose connection errror', error)
  })
