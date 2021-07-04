import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Token', TokenSchema)
