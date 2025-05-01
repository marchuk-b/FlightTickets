import React from 'react'
import { Form } from '../components/Form/Form'
import API from '../api/axios'

export const RegistrationPage = () => {
  const handleRegister = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      alert('Паролі не збігаються');
      return;
    }

    try {
      await API.post('/auth/register', formData)
      alert('Реєстрація успішна!')
      console.log('Registration successful:')
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message)
      alert(error.response?.data?.message || 'Не вдалося зареєструватися')
      
    }
  }

  const fields = [
    { name: 'username', label: "Ім'я користувача", type: 'text', required: true },
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
