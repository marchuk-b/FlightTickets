import React from 'react'
import './Form.css'

export const Form = () => {
  return (
    <div className="container">
      <div className="form">
        <div className='form__title'>Реєстрація нового користувача</div>
        <form>
          <div className="form__group">
            <label className='form__label' htmlFor="name">Ім'я та прізвище</label>
            <input className='form__input' type="text" required />
          </div>
          <div className="form__group">
            <label className='form__label' htmlFor="email">Email</label>
            <input className='form__input' type="email"required />
          </div>
          <div className="form__group">
            <label className='form__label' htmlFor="password">Пароль</label>
            <input className='form__input' type="password" required />
          </div>
          <div className="form__group">
            <label className='form__label' htmlFor="email">Підтвердження паролю</label>
            <input className='form__input' type="password" required />
          </div>
          <div className="form__group reverse">
            <label className='form__label normal' htmlFor="email">Я погоджуюся з <a href="https://policies.google.com/terms?hl=uk" target='_blank' className="form__link">Умовами використання</a></label>
            <input className='form__input checkbox' type="checkbox" required />
          </div>
          <div className="form__btns">
            <button className='form__btn'>Зареєструватися</button>
            <div className='form__move'>
              Вже маєте акаунт? <a href='/login' className='form__move-btn'>Увійти</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
