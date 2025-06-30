import React, { useState } from 'react'
import { Box, InputAdornment, TextField, Tooltip } from '@mui/material'
import styles from '../../pages/Auth.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next";

interface Props{
    handleSectionChange: () => void
    setFirstName: React.Dispatch<React.SetStateAction<string>>
    setLastName: React.Dispatch<React.SetStateAction<string>>
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setPassword: React.Dispatch<React.SetStateAction<string>>
    setRetypedPassword: React.Dispatch<React.SetStateAction<string>>
    handleSubmitRegister: (e: React.FormEvent) => void
    formatName: (n: string) => string
  }

const SignupForm = ({handleSectionChange, setFirstName, setLastName, setEmail, setPassword, setRetypedPassword, handleSubmitRegister, formatName}: Props) => {
  const { t } = useTranslation();
const [showPassword, setShowPassword] = useState<boolean>(false)
const [showRetypedPassword, setShowRetypedPassword] = useState(false);

  
  return (
    <div className={styles.formContainer}>
      <h1>{t("auth.signupTitle")}</h1>
      <h2 className={styles.secondaryText}>
        {t("auth.signupAlready")} <span className={styles.actionText} onClick={handleSectionChange}>{t("auth.signupLogin")}</span>
      </h2>

        <form className={styles.form}>
          <Box display='flex' flexDirection='row' justifyContent='space-between'>
            <TextField
            id="firstName-input"
            type= "text"
            label={t("auth.signupFirstName")}
            autoComplete='family-name'
            variant="outlined"
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
              width: { xs: '48%' },
            }}
            className={styles.textField}
            onChange={(e) => setFirstName(() => formatName(e.target.value))}
            />

            <TextField
            id="lastName-input"
            type= "text"
            label={t("auth.signupLastName")}
            autoComplete='given-name'
            variant="outlined"
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
              width: { xs: '48%' },
            }}
            className={styles.textField}
            onChange={(e) => setLastName(() => formatName(e.target.value))}
            />
          </Box>
          
            <TextField
            id="email-input"
            type= "email"
            label={t("auth.signupEmail")}
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
            id="password-input"
            label={t("auth.signupPassword")}
            type = {!showPassword ? "password" : "text"}
            autoComplete="current-password"
            variant="outlined"
            size="small"
            fullWidth
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

            <TextField
            id="re-password-input"
            label={t("auth.signupRetypedPassword")}
            type = {!showRetypedPassword ? "password" : "text"}
            autoComplete="current-password"
            variant="outlined"
            size="small"
            fullWidth
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
            onChange={(e) => setRetypedPassword(e.target.value.trim())}
            slotProps={{
              input:{
                endAdornment: (
                  <InputAdornment position="end" onClick={() => setShowRetypedPassword(!showRetypedPassword)}>
                    <Tooltip title={showRetypedPassword ? "Hide password" : "Show password"} placement='bottom'>
                      <FontAwesomeIcon 
                        icon={showRetypedPassword ? faEyeSlash : faEye} 
                        className={styles.clickableIcon}
                      />
                    </Tooltip>
                  </InputAdornment>
                )
              }
            }}
            />

            <button className={styles.submitButton} type='submit' onClick={handleSubmitRegister}>{t("auth.signupButton")}</button>
        </form>
    </div>
  )
}

export default SignupForm