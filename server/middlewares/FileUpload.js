import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.cwd(), 'server/media/'))
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')
    cb(
      null,
      `${file.fieldname}-${new Date().getTime()}.${
        extension[extension.length - 1]
      }`
    )
  },
})

const fileUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let extension = file.originalname.split('.')
    if (extension.length == 2) {
      extension = extension[extension.length - 1]
      if (extension == 'png' || extension == 'jpg') {
        cb(null, true)
      }
    } else {
      cb(null, false)
    }
  },
})

export default fileUpload
