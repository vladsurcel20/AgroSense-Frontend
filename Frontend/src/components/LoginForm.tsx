import React from 'react'
import { OutlinedInput, FormControl, InputLabel, TextField, Checkbox } from '@mui/material'
import styles from '../pages/Auth.module.css'

const LoginForm = () => {


  return (
    <div className={styles.formContainer}>
      <h1>Log in to yor Account</h1>
      <p className={styles.secondaryText}>Welcome back!</p>

      <form className={styles.form}>
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
          <p className={styles.secondaryText}>Don't have an account?  <span className={styles.actionText}>Create an account</span></p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm