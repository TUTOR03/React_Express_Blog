import express from 'express'
import { body, query, param } from 'express-validator'
import JWTAuth from '../middlewares/JWTAuthentication.js'
import validateBody from '../middlewares/CheckValidation.js'
import fileUpload from '../middlewares/FileUpload.js'
import ArticleController from '../controllers/ArticleController.js'

const router = express.Router()

router.post(
  '/create',
  JWTAuth,
  fileUpload.single('img'),
  body('title').exists().notEmpty().trim().escape(),
  body('description').exists().trim().escape(),
  body('markdown').exists().trim().escape(),
  body('short').exists().isBoolean(),
  body('hashtag').exists().trim().escape(),
  validateBody,
  async (req, res, next) => {
    const { title, description, markdown, short, hashtag } = req.body
    try {
      const article = await ArticleController.create(
        title,
        description,
        markdown,
        short,
        hashtag,
        req.file
      )
      return res.status(200).json(article)
    } catch (err) {
      return next(err)
    }
  }
)

router.get(
  '/list',
  query('page').exists().isInt({ min: 1 }),
  query('perpage').exists().isInt({ min: 1 }),
  validateBody,
  async (req, res, next) => {
    try {
      const { page, perpage } = req.query
      return res
        .status(200)
        .json(await ArticleController.list(parseInt(page), parseInt(perpage)))
    } catch (err) {
      return next(err)
    }
  }
)

router.get(
  '/:slug',
  param('slug').exists().notEmpty(),
  validateBody,
  async (req, res, next) => {
    try {
      const { slug } = req.params
      return res.status(200).json(await ArticleController.single(slug))
    } catch (err) {
      return next(err)
    }
  }
)

router.delete(
  '/:slug',
  param('slug').exists().notEmpty(),
  validateBody,
  async (req, res, next) => {
    try {
      const { slug } = req.params
      await ArticleController.delete(slug)
      return res.status(200).json({})
    } catch (err) {
      return next(err)
    }
  }
)

router.put(
  '/:slug',
  JWTAuth,
  param('slug').exists().notEmpty(),
  fileUpload.single('img'),
  body('title').exists().notEmpty().trim().escape(),
  body('description').exists().trim().escape(),
  body('markdown').exists().trim().escape(),
  body('short').exists().isBoolean(),
  body('hashtag').exists().trim().escape(),
  validateBody,
  async (req, res, next) => {
    try {
      const { slug } = req.params
      const { title, description, markdown, short, hashtag } = req.body
      console.log(req.file)
      return res.status(200).json(
        await ArticleController.update(
          slug,
          {
            title,
            description,
            markdown,
            short,
            hashtag,
          },
          req.file
        )
      )
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
)

export default router
