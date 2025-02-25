import React from 'react'
import { OutlinedInput, FormControl, InputLabel, TextField, Checkbox } from '@mui/material'
import styles from '../pages/Auth.module.css'

interface Props{
    handleHasAccount: () => void
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setPassword: React.Dispatch<React.SetStateAction<string>>
    setRetypedPassword: React.Dispatch<React.SetStateAction<string>>
    handleSubmitRegister: (e: React.FormEvent) => void
  }

const SignupForm = ({handleHasAccount, setEmail, setPassword, setRetypedPassword, handleSubmitRegister}: Props) => {
  return (
    <div className={styles.formContainer}>
        <h1>Create a new account</h1>
        <h2 className={styles.secondaryText}>Already have an account? <span className={styles.actionText} onClick={handleHasAccount}>Log in</span></h2>

        <form className={styles.form} onSubmit={handleSubmitRegister}>
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

            <TextField
            id="outlined-re-password-input"
            label="Retype Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="small"
            fullWidth
            sx={{mb: "1rem", color:"white" }}
            className={styles.textField}
            onChange={(e) => setRetypedPassword(e.target.value.trim())}
            />

            <button className={styles.submitButton} type='submit'>Create account</button>
        </form>
    </div>
  )
}

export default SignupForm