import React from 'react'
import { Form } from '../components/Form/Form'

export const RegistrationPage = () => {
  const handleRegister = () => {

    console.log('Реєстрація з даними:')
    // відправити через axios
  }

  const fields = [
    { name: 'username', label: "Ім'я та прізвище", type: 'text', required: true },
    { name: 'email', label: "Email", type: 'email', required: true },
    { name: 'password', label: "Пароль", type: 'password', required: true },
    { name: 'confirmPassword', label: "Підтвердження паролю", type: 'password', required: true },
    { name: 'agree', label: (
      <>
        Я погоджуюся з{' '}
        <a
          href="https://policies.google.com/terms?hl=uk"
          target="_blank"
          className="form__link"
        >
          Умовами використання
        </a>
      </>
    ), type: 'checkbox', required: true }
  ]

  return (
    <Form
      title="Реєстрація нового користувача"
      fields={fields}
      onSubmit={handleRegister}
      btnTitle={"Зареєструватися"}
      bottomText="Вже маєте акаунт?"
      bottomLink="/login"
      bottomLinkText="Увійти"
    />
  )
}
