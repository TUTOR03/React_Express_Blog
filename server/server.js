import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { PORT } from './env.js'
import multer from 'multer'

import adminRouter from './routers/admin.js'
import articleRouter from './routers/article.js'
import inviteRouter from './routers/invite.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/admin', adminRouter)
app.use('/article', articleRouter)
app.use('/invite', inviteRouter)

app.use('/media', express.static('media'))

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: 'Wrong file or file is undefined',
    })
  }
  return err && next(err)
})

mongoose.connect('mongodb://localhost/my_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.get('/', (req, res) => {
  res.json({ data: 'Hello' })
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
