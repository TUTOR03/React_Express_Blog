import * as MainStyles from '@styles/main'
import { useStore } from '@utils/store/store'
import React from 'react'
import { CardButton, CardForm, CardInput, CardInputContainer, CardInputLabel, CardTitle, LoginPageCard } from './Login.styles'

const Login: React.FC = () => {
  const {state, dispatch} = useStore()
  return <MainStyles.ContainerCenter className='main_bg'>
    <LoginPageCard>
    <CardTitle>Log In</CardTitle>
    <CardForm>
      <CardInputContainer>
        <CardInput id='login_email' type='email' placeholder='Login' className='custom'/>
        <CardInputLabel htmlFor='login_email'>Login</CardInputLabel>
      </CardInputContainer>
      <CardInputContainer>
        <CardInput id='login_password' type='password' placeholder='Password' className='custom'/>
        <CardInputLabel htmlFor='login_password'>Password</CardInputLabel>
      </CardInputContainer>
      <CardButton className='custom'>Log in</CardButton>
    </CardForm>
    </LoginPageCard>
  </MainStyles.ContainerCenter>
}

export default Login
