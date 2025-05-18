import {useNavigate} from 'react-router-dom'
import { Form } from '../components/Form/Form'
import API from '../api/axios'
import { toast } from 'react-toastify';

export const RegistrationPage = () => {
  const navigate = useNavigate()

  const handleRegister = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Паролі не збігаються');
      return;
    }

    try {
      await API.post('/auth/register', formData)
      toast.success('Реєстрація успішна!')
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message)
      toast.error(error.response?.data?.message || 'Не вдалося зареєструватися')
    }
  }

  const fields = [
    { name: 'username', label: "Ім'я користувача", type: 'text', required: true },
    { name: 'email', label: "Email", type: 'email', required: true, autoComplete: 'email' },
    { name: 'password', label: "Пароль", type: 'password', required: true, autoComplete: 'new-password' },
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
