import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
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
