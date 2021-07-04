import mongoose from 'mongoose'
import crypto from 'crypto'
import { PASS_SECRET } from '../env.js'
import { BASE_ACCESS_LEVEL } from '../env.js'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  level: {
    type: Number,
    default: BASE_ACCESS_LEVEL,
  },
})

// UserSchema.pre('save', function () {
//   const hash = crypto.createHmac('sha256', PASS_SECRET)
//   hash.update(`${this.username}${this.password}`)
//   this.password = hash.digest('hex')
// })

// UserSchema.methods.validateUserPass = function (pass) {
//   const hash = crypto.createHmac('sha256', PASS_SECRET)
//   hash.update(`${this.username}${pass}`)
//   return this.password == hash.digest('hex')
// }

export default mongoose.model('User', UserSchema)
