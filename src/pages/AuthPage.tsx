import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import styles from './Auth.module.css'
import SignupForm from '../components/SignupForm'
import { useAuth } from '../contexts/AuthContext'
import { toast } from "sonner"

const AuthPage = () => {

  const [hasAccount, setHasAccount] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [retypedPassword, setRetypedPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  const {login, register} = useAuth()

  const resetData = () => {
    setEmail('')
    setPassword('')
    setRetypedPassword('')
    setFirstName('')
    setLastName('')
  }

  const handleHasAccount = () => {
    setHasAccount(!hasAccount)
    resetData();
  }

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await login(email, password);
    if(res?.status === 200){
      toast.success("Login successful")
      resetData();
    }
  }
  
  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if(password !== retypedPassword){
      toast.error("Passwords do not match");
      return
    } 

    const res = await register(firstName, lastName, email, password)
    if( res?.status === 201){
      console.log("User created")
      setHasAccount(true)
    }
  }

  const formatName = (name: string) => {
    const nameArr = name.trim().split(/\s+/);
    return nameArr.map((word) =>
      word
        .split('-')
        .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
        .join('-')
    )
    .join(' '); 
  }

  return (
    <div className={styles.authpage}>
        {hasAccount ? 
          <LoginForm 
            handleHasAccount={handleHasAccount} 
            setEmail={setEmail} 
            setPassword={setPassword}
            handleSubmitLogin={handleSubmitLogin}
          /> 
          : 
          <SignupForm 
            handleHasAccount={handleHasAccount} 
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail} 
            setPassword={setPassword} 
            setRetypedPassword={setRetypedPassword}
            handleSubmitRegister={handleSubmitRegister} 
            formatName={formatName}
          /> 
        }

        <div className={styles.photoContainer}>
            <img src="background2.png" alt="background image" className={styles.photo}/>
        </div>
    </div>
  )
}

export default AuthPage