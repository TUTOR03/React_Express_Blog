import APIError from '../assets/APIError.js'

const LevelAccess = (level) => {
  return (req, res, next) => {
    if (req.auth.level > level) {
      throw APIError.lowLevelAccess()
    }
    return next()
  }
}

export default LevelAccess
