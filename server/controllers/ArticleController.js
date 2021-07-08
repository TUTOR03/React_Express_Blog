import Article from '../models/Article.js'
import fs from 'fs'
import APIError from '../assets/APIError.js'
import slugify from 'slugify'

class Articlecontroller {
  async create(title, description, markdown, short, hashtag, file) {
    if (await this.exists({ title })) {
      if (file) {
        fs.unlinkSync(file.path)
      }
      throw APIError.create(400, 'Article with this title already exists')
    }

    return this.forResponse(
      await Article.create({
        title,
        description,
        markdown,
        slug: slugify(title, {
          replacement: '_',
          lower: true,
        }),
        created: new Date().getTime(),
        short,
        hashtag: hashtag.split('#').slice(1),
        img: file ? file.path : '',
      })
    )
  }

  async list(page, perOne) {
    return (
      await Article.find({}, null, { sort: { created: -1 } })
        .skip(perOne * (page - 1))
        .limit(perOne)
    ).map((ob) => this.forResponse(ob, true))
  }

  async single(slug) {
    if (!(await this.exists({ slug }))) {
      throw APIError.create(404, "Article doesn't exist")
    }
    return this.forResponse(await Article.findOne({ slug }))
  }

  async exists(params) {
    return await Article.exists(params)
  }

  forResponse(article, list = false) {
    return {
      title: article.title,
      description: article.description,
      markdown: list ? '' : article.markdown,
      created: article.created,
      short: article.short,
      img: article.img,
      slug: article.slug,
    }
  }
}

export default new Articlecontroller()
