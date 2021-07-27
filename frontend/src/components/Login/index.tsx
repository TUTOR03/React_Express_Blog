import * as MainStyles from '@styles/main'
import { useStore } from '@utils/store/store'
import React, { ChangeEvent, useState } from 'react'
import { CardButton, CardForm, CardInput, CardInputContainer, CardInputLabel, CardTitle, LoginPageCard } from './Login.styles'

const Login: React.FC = () => {
  const {state, dispatch} = useStore()
  const [inputState, setInputState] = useState({
    email: '',
    password: '',
  })

  const inputChange = (event: ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    setInputState((prev)=>({
      ...prev,
      [event.target.name]:event.target.value
    }))
  }

  const formSubmit = (event: ChangeEvent<HTMLFormElement>)=>{
    event.preventDefault()
    console.log(inputState)
  }

  return <MainStyles.ContainerCenter className='main_bg'>
    <LoginPageCard>
    <CardTitle>Log In</CardTitle>
    <CardForm onSubmit={formSubmit}>
      <CardInputContainer>
        <CardInput onChange={inputChange} value={inputState.email} id='login_email' name='email' type='email' placeholder='Login' className='custom'/>
        <CardInputLabel htmlFor='login_email'>Login</CardInputLabel>
      </CardInputContainer>
      <CardInputContainer>
        <CardInput onChange={inputChange} value={inputState.password} id='login_password' name='password' type='password' placeholder='Password' className='custom'/>
        <CardInputLabel htmlFor='login_password'>Password</CardInputLabel>
      </CardInputContainer>
      <CardButton type='submit' className='custom'>Log in</CardButton>
    </CardForm>
    </LoginPageCard>
  </MainStyles.ContainerCenter>
}

export default Login
