import React, { ReactEventHandler } from 'react'
import {TextField} from '@mui/material'
import styles from '../pages/Auth.module.css'

interface Props{
  handleHasAccount: () => void
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleSubmitLogin: (e: React.FormEvent) => void
}

const LoginForm = ({handleHasAccount, setEmail, setPassword, handleSubmitLogin}: Props) => {


  return (
    <div className={styles.formContainer}>
      <h1>Log in to your Account</h1>
      <h2 className={styles.secondaryText}>Welcome back!</h2>

      <form className={styles.form} onSubmit={handleSubmitLogin}>
        <TextField
          id="outlined-email-input"
          type= "email"
          label="Email"
          autoComplete='email'
          variant="outlined"
          fullWidth
          size='small'
          sx={{mb: "1rem" }}
          className={styles.textField}
          onChange={(e) => setEmail(e.target.value.trim())}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          size="small"
          fullWidth
          sx={{mb: "1rem", color:"white" }}
          className={styles.textField}
          onChange={(e) => setPassword(e.target.value.trim())}
          />

        <div className={styles.between}>
          <div>
            <input id="rememberCheckbox" type='checkbox' />
            <label id="rememberText" htmlFor="rememberCheckbox" className={styles.secondaryText}>Remember me</label>
          </div>

          <span className={styles.actionText}>Forgot password</span>
        </div>

        <button className={styles.submitButton} type='submit'>Log in</button>

        <div className={styles.center}>
          <p className={styles.secondaryText}>Don't have an account?  <span className={styles.actionText} onClick={handleHasAccount}>Create an account</span></p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm