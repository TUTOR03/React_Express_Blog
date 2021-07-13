import Login from '@components/Login'
import Register from '@components/Register'
import { AppRoutes } from '@type/routes'

export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/register'
export const ARTICLE_LIST_ROUTE = '/article'
export const ARTICLE_SINGLE_ROUTE = '/article/:slug'

export const publicRoutes: AppRoutes = [
  {
    route: LOGIN_ROUTE,
    Component: Login,
  },
  {
    route: REGISTER_ROUTE,
    Component: Register,
  },
]
