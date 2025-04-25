import React from 'react'
import { Form } from '../components/Form/Form'

export const LoginPage = () => {
  const handleLogin = () => {
    console.log('Логін з даними:')
    // логін через axios
  }

  const fields = [
    { name: 'email', label: "Email", type: 'email', required: true },
    { name: 'password', label: "Пароль", type: 'password', required: true }
  ]

  return (
    <Form
      title="Вхід в акаунт"
      fields={fields}
      onSubmit={handleLogin}
      btnTitle={"Увійти"}
      bottomText="Не маєте акаунта?"
      bottomLink="/registration"
      bottomLinkText="Зареєструватися"
    />
  )
}
