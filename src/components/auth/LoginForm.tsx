import React, { useState } from 'react'
import { TextField, InputAdornment, Tooltip} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next";
import styles from '../../pages/Auth.module.css'

interface Props{
  handleSectionChange: () => void
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleSubmitLogin: (e: React.FormEvent) => void
}

const LoginForm = ({handleSectionChange, setEmail, setPassword, handleSubmitLogin}: Props) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className={styles.formContainer}>
      <h1>{t("auth.loginTitle")}</h1>
      <h2 className={styles.secondaryText}>{t("auth.loginWelcome")}</h2>

      <form className={styles.form} onSubmit={handleSubmitLogin}>
        <TextField
          id="outlined-email-input"
          type= "email"
          label={t("auth.loginEmail")}
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
          label={t("auth.loginPassword")}
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
            <label id="rememberText" htmlFor="rememberCheckbox" className={styles.secondaryText}>
              {t("auth.loginRemember")}
            </label>
          </div>
          <span className={styles.actionText}>{t("auth.loginForgot")}</span>
        </div>

        <button className={styles.submitButton} type='submit'>{t("auth.loginButton")}</button>

        <div className={styles.center}>
          <p className={styles.secondaryText}>
            {t("auth.loginNoAccount")} <span className={styles.actionText} onClick={handleSectionChange}>{t("auth.loginCreateAccount")}</span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm