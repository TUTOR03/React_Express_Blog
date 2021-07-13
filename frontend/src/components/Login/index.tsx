import { useStore } from '@utils/store/store'
import React from 'react'

const Login: React.FC = () => {
  const context = useStore()
  return <h1>Login Page {context.state.user.isAuth ? 'true' : 'false'}</h1>
}

export default Login
