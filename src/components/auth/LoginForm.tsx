import React, { useState } from 'react'
import { TextField, InputAdornment, Tooltip} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import styles from '../../pages/Auth.module.css'

interface Props{
  handleSectionChange: () => void
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleSubmitLogin: (e: React.FormEvent) => void
}

const LoginForm = ({handleSectionChange, setEmail, setPassword, handleSubmitLogin}: Props) => {

const [showPassword, setShowPassword] = useState<boolean>(false)


  return (
    <div className={styles.formContainer}>
      <h1>Log in to your account</h1>
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
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "2.5em",
              "& fieldset": {
                borderColor: "var(--main-btn-color)",
              },
              "&:hover fieldset": {
                borderColor: "var(--main-btn-color)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--main-btn-color)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--main-btn-color)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--main-btn-color)",
            },
            mb: "1rem",
          }}
          className={styles.textField}
          onChange={(e) => setEmail(e.target.value.trim())}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type = {!showPassword ? "password" : "text"}
          autoComplete="current-password"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              height: "2.5em",
              "& fieldset": {
                borderColor: "var(--main-btn-color)",
              },
              "&:hover fieldset": {
                borderColor: "var(--main-btn-color)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--main-btn-color)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--main-btn-color)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--main-btn-color)",
            },
            mb: "1rem", 
            color:"white",
          }}
          className={styles.textField}
          onChange={(e) => setPassword(e.target.value.trim())}
          slotProps={{
            input:{
              endAdornment: (
                <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                  <Tooltip title={showPassword ? "Hide password" : "Show password"} placement='bottom'>
                    <FontAwesomeIcon 
                      icon={showPassword ? faEyeSlash : faEye} 
                      className={styles.clickableIcon}
                    />
                  </Tooltip>
                </InputAdornment>
              )
            }
          }}
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
          <p className={styles.secondaryText}>Don't have an account?  <span className={styles.actionText} onClick={handleSectionChange}>Create an account</span></p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm