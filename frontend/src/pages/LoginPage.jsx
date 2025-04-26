import React from 'react'
import { Form } from '../components/Form/Form'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../api/AuthContext'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (formData) => {
    try {
      const { data } = await API.post('/auth/login', formData) // відправляємо email і password

      login(data.user)
      console.log('Login successful:', data)
      navigate('/flights')
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message)
      alert(error.response?.data?.message || 'Не вдалося увійти')
    }
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
