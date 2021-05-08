import dotenv from 'dotenv'
import path from 'path'

const result = dotenv.config({
  path: path.resolve(process.cwd(), 'server/.env'),
})

if (result.error) {
  throw result.error
}

export const PORT = process.env.PORT || 8000
export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const PASS_SECRET = process.env.PASS_SECRET || 'secret'
export const INVITE_CODE = process.env.INVITE_CODE || 'invite'
export const BASE_ACCESS_LEVEL = process.env.BASE_ACCESS_LEVEL || 2
