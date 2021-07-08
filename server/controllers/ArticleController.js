import Article from '../models/Article.js'
import fs from 'fs'
import APIError from '../assets/APIError.js'
import slugify from 'slugify'

class Articlecontroller {
  async create(title, description, markdown, short, hashtag, file) {
    if (await Article.exists()) {
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
