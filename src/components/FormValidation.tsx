import { useState } from 'react'
import styles from './FormValidation.module.css'

export default function FormValidation() {
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*
    condition:
      - valid email form
      - only google or github domain
    */
    const idReg1 = /\w+@\w*(\.\w+)+$/
    const idReg2 = /\w+@(gmail.com|github.com)$/

    const email = e.target.value
    if (!email.match(idReg1)) {
      setEmailMessage('not a vaild email form')
    } else if (!email.match(idReg2)) {
      setEmailMessage('only google or github email is allowed')
    } else {
      setEmailMessage('')
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*
    condition:
      - 6 ~ 20 length
      - not more than 3 consecutive same character
      - not more than 3 consecutive number
      - include at least 1 specific special charcater: (!,@,#,$,%,^,&,*)
      - not include white space
    */
    const passwordReg1 = /([A-Za-z])\1{2,}/
    const passwordReg2 = /123|234|345|456|567|678|789/
    const passwordReg3 = /^[^!@#$%^&*]+$/
    const passwordReg4 = /\s/g

    const password = e.target.value

    if (password.length < 6 || password.length > 20) {
      setPasswordMessage(
        'password length should be between 6 and 20 characters'
      )
    } else if (password.match(passwordReg1)) {
      setPasswordMessage('password should not include 3 or more same character')
    } else if (password.match(passwordReg2)) {
      setPasswordMessage(
        'password should not include 3 or more increasing numbers'
      )
    } else if (password.match(passwordReg3)) {
      setPasswordMessage(
        'password should include at least 1 specific special charcater: (!,@,#,$,%,^,&,*)'
      )
    } else if (password.match(passwordReg4)) {
      setPasswordMessage('password should not include white space')
    } else setPasswordMessage('')
  }

  return (
    <>
      <section>
        <h1>Form Validation</h1>
        <div className={styles.container}>
          <label>
            <span>email</span>
            <input onChange={handleEmailChange} />
            <p>{emailMessage}</p>
          </label>
          <label>
            <span>password</span>
            <input type='password' onChange={handlePasswordChange} />
            <p>{passwordMessage}</p>
          </label>
        </div>
      </section>
    </>
  )
}
