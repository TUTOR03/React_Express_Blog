import { validationResult } from 'express-validator'
import Article from '../models/Article.js'

const validateSlug = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  if (!(await Article.exists({ slug: req.params.slug }))) {
    return res.status(404).json({
      error: 'Article not found',
    })
  }
  return next()
}

export default validateSlug
