import mongoose from 'mongoose'
import slugify from 'slugify'

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
  },
  created: {
    type: Number,
  },
  short: {
    type: Boolean,
  },
  hashtag: {
    type: [String],
  },
  img: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
})

ArticleSchema.pre('save', function () {
  this.slug = slugify(this.title, {
    replacement: '_',
    lower: true,
  })
  this.created = this.created ? this.created : new Date().getTime()
})

ArticleSchema.methods.responseData = function (list = false) {
  return {
    title: this.title,
    description: this.description,
    markdown: !list ? this.markdown : '',
    created: this.created,
    img: this.img,
    slug: this.slug,
  }
}

export default mongoose.model('Article', ArticleSchema)
