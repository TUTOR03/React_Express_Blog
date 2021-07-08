import express from 'express'
import { body, query, param } from 'express-validator'
import JWTAuth from '../middlewares/JWTAuthentication.js'
import validateBody from '../middlewares/CheckValidation.js'
import fileUpload from '../middlewares/FileUpload.js'
import validateSlug from '../middlewares/CheckSlug.js'
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

// router.put(
//   '/:slug',
//   JWTAuth,
//   param('slug').exists().notEmpty(),
//   validateSlug,
//   fileUpload.single('img'),
//   body('title').exists().notEmpty().trim().escape(),
//   body('description').exists().trim().escape(),
//   body('markdown').exists().notEmpty().trim().escape(),
//   validateBody,
//   async (req, res) => {
//     const { slug } = req.params
//     const { title, description, markdown } = req.body
//     let article = await Article.findOne({ slug })
//     if (title && article.title != title && (await Article.exists({ title }))) {
//       if (req.file) {
//         fs.unlinkSync(req.file.path)
//       }
//       return res.status(409).json({
//         error: 'Article with this title already exists',
//       })
//     }
//     article.title = title
//     article.description = description
//     article.markdown = markdown
//     if (req.file) {
//       fs.unlinkSync(article.img)
//       article.img = req.file.path
//     }
//     await article.save()
//     return res.status(200).json(article.responseData())
//   }
// )

// router.delete(
//   '/:slug',
//   JWTAuth,
//   param('slug').exists().notEmpty(),
//   validateSlug,
//   async (req, res) => {
//     const { slug } = req.params
//     const article = await Article.findOne({ slug })
//     if (article.img) {
//       fs.unlinkSync(article.img)
//     }
//     await Article.deleteOne({ slug })
//     return res.status(200).json()
//   }
// )

export default router
