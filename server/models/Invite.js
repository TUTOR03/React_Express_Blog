import mongoose from 'mongoose'
import { BASE_ACCESS_LEVEL } from '../env.js'

const InvitationSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    default: BASE_ACCESS_LEVEL,
  },
  created: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
})

export default mongoose.model('Invite', InvitationSchema)
