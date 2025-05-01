import React, { useEffect, useState } from 'react'
import './EditProfilePage.css'
import userImg from '../assets/user.png'
import { useAuth } from '../api/AuthContext'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

export const EditProfilePage = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
      });
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const getInfo = async () => {
                const response = await API.get(`/users/${user.id}`, {withCredentials: true}); 
                const userData = response.data; 
                console.log(userData); 
                setUserInfo(userData);
            }
            getInfo()
        } catch (error) {
            console.log(error)
        }
    }, [user]) 

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const { username, email, newPassword, confirmPassword } = userInfo;
      
        if (!username.trim() || !email.trim()) {
          alert("Будь ласка, заповніть ім'я та email.");
          return;
        }
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert("Введіть коректний email.");
          return;
        }
      
        if (newPassword || confirmPassword) {
          if (newPassword.length < 6) {
            alert("Пароль має містити щонайменше 6 символів.");
            return;
          }
          if (newPassword !== confirmPassword) {
            alert("Паролі не співпадають.");
            return;
          }
        }
      
        try {
          const payload = {
            username,
            email,
            ...(newPassword ? { password: newPassword } : {})
          };
      
          await API.put(`/users/${user.id}`, payload, { withCredentials: true });
          alert('Профіль оновлено');
          setUserInfo({ ...userInfo, newPassword: '', confirmPassword: '' });
          navigate('/profile');
        } catch (error) {
          console.error(error);
          alert('Помилка при оновленні профілю');
        }
    };
      

  return (
    <div className='editpage'>
        <div className="container">
            <div className="editpage__content">
                <div className="editpage__edit">
                    <div className="edit__title">Редагування користувача</div>
                    <div className="edit__footer">
                        <form onSubmit={handleSubmit} className="edit__form">
                            <div className="edit__element">
                                <label className='edit__label'>
                                Ім'я користувача:
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className='edit__input'
                                    value={userInfo.username || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="edit__element">
                                <label className='edit__label'>
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className='edit__input'
                                    value={userInfo.email || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="edit__element">
                                <label className='edit__label'>
                                    Новий пароль:
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    className='edit__input'
                                    value={userInfo.newPassword || ''}
                                    onChange={handleChange}
                                    />
                            </div>

                            <div className="edit__element">
                                <label className='edit__label'>
                                    Підтвердіть пароль:
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className='edit__input'
                                    value={userInfo.confirmPassword || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className='edit__btn' type="submit">Зберегти зміни</button>
                        </form>

                        <div className="edit__ps">
                            Можливість змінити фотографію користувача буде додана згодом. Слідкуйте за оновленнями!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
