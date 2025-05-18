import React, { useState } from 'react'
import './Form.css'

export const Form = ({ title, fields, onSubmit, btnTitle, bottomText, bottomLink, bottomLinkText }) => {
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="container">
      <div className="form">
        <div className='form__title'>{title}</div>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div className={`form__group ${field.type === 'checkbox' ? 'reverse' : ''}`} key={index}>
              <label className={`form__label ${field.type === 'checkbox' ? 'normal' : ''}`} htmlFor={field.name}>
                {field.label}
              </label>
              <input
                className={`form__input ${field.type === 'checkbox' ? 'checkbox' : ''}`}
                type={field.type}
                name={field.name}
                required={field.required}
                onChange={handleChange}
                autoComplete={field.autoComplete || 'off'}
              />
            </div>
          ))}

          <div className="form__btns">
            <button className='form__btn' type="submit">{btnTitle}</button>
            <div className='form__move'>
              {bottomText} <a href={bottomLink} className='form__move-btn'>{bottomLinkText}</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
