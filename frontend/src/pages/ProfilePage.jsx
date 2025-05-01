import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import userImg from '../assets/user.png'
import { useAuth } from '../api/AuthContext'
import API from '../api/axios'

export const ProfilePage = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({})

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

  return (
    <div className='profilepage'>
        <div className="container">
            <div className="profilepage__content">
                <div className="profilepage__profile">
                    <div className="profile__header">
                        <img src={userImg} className='profile__img' alt="" />
                        <div className="profile__info">
                            <div className="profile__username">{userInfo.username}</div>
                            <div className="profile__email">{userInfo.email}</div>
                            <div className="profile__achievement">Льочік-початківець</div>
                        </div>
                    </div>
                    <div className="profile__footer">

                    </div>
                </div>
                <div className="profilepage__ticketlist">
                    <div className="profilepage__title">Квитки користувача:</div>
                    <div className='profilepage__notfound'>Поки немає🥸</div>
                </div>
            </div>
        </div>
    </div>
  )
}
