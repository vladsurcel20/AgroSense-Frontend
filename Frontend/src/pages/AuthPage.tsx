import React from 'react'
import LoginForm from '../components/LoginForm'
import styles from './Auth.module.css'

const AuthPage = () => {

  return (
    <div className={styles.authpage}>
        <LoginForm />
        <div className={styles.photoContainer}>
            <img src="background2.png" alt="background image" className={styles.photo}/>
        </div>
    </div>
  )
}

export default AuthPage