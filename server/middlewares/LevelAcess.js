const LevelAccess = (level) => {
  return (req, res, next) => {
    if (req.auth.level > level) {
      return res.status(400).json({ error: 'Low level of access' })
    }
    return next()
  }
}

export default LevelAccess
