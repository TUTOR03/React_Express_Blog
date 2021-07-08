import { validationResult } from 'express-validator'
import Article from '../models/Article.js'
import APIError from '../assets/APIError.js'

const validateSlug = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw APIError.create(400, 'Incorrect data', errors)
  }
  if (!(await Article.exists({ slug: req.params.slug }))) {
    throw APIError.create(404, "Article doesn't exist")
  }
  return next()
}

export default validateSlug
