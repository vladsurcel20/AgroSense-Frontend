import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import styles from './Auth.module.css'
import SignupForm from '../components/SignupForm'
import { useAuth } from '../contexts/AuthContext'

const AuthPage = () => {

  const [hasAccount, setHasAccount] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [retypedPassword, setRetypedPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  const {login, register} = useAuth()

  const handleHasAccount = () => {
    setHasAccount(!hasAccount)
    setEmail('')
    setPassword('')
    setRetypedPassword('')
    setFirstName('')
    setLastName('')
  }

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }
  
  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    await register(firstName, lastName, email, password)
  }

  return (
    <div className={styles.authpage}>
        {!hasAccount ? 
          <LoginForm 
            handleHasAccount={handleHasAccount} 
            setEmail={setEmail} 
            setPassword={setPassword}
            handleSubmitLogin={handleSubmitLogin}
          /> 
          : 
          <SignupForm 
            handleHasAccount={handleHasAccount} 
            setEmail={setEmail} 
            setPassword={setPassword} 
            setRetypedPassword={setRetypedPassword}
            handleSubmitRegister={handleSubmitRegister} 
          /> 
        }

        <div className={styles.photoContainer}>
            <img src="background2.png" alt="background image" className={styles.photo}/>
        </div>
    </div>
  )
}

export default AuthPage