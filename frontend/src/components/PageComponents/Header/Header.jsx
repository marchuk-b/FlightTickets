import React from 'react';
import './Header.css';
import logo from '../../../assets/logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__links">
            <img src={logo} alt="" className="header__logo" />
            <a href="" className="header__link">Головна</a>
            <a href="" className="header__link active">Рейси</a>
            <a href="" className="header__link">Про нас</a>
            <a href="" className="header__link">Контакти</a>
          </div>

          <div className="header__btns">
            <button className="header__btn">Увійти</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
