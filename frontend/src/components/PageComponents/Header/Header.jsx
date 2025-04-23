import React, { useState } from 'react';
import './Header.css';
import logo from '../../../assets/logo.png';

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
      setIsBurgerOpen(!isBurgerOpen);
  };

  const handleNavLinkClick = () => {
      setIsBurgerOpen(false);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <img src={logo} alt="" className="header__logo" />
          <nav className="header__nav">
            <div className={`header__links ${isBurgerOpen ? 'header__links--open' : 'header__links--close'}`}>
              <a href="/" className="header__link" onClick={handleNavLinkClick}>Головна</a>
              <a href="/flights" className="header__link" onClick={handleNavLinkClick}>Рейси</a>
              <a href="/about" className="header__link" onClick={handleNavLinkClick}>Про нас</a>
              <a href="/contacts" className="header__link" onClick={handleNavLinkClick}>Контакти</a>
              {isBurgerOpen &&
                <button className="header__close-btn" onClick={toggleBurgerMenu}>Закрити меню</button> 
              }
            </div>

            <div
                className={`header__burgermenu ${isBurgerOpen ? 'header__burgermenu--active' : 'header__burgermenu--not-active'}`}
                onClick={toggleBurgerMenu}
            >
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
            </div>

            <div className="header__btns">
              <button className="header__btn">Увійти</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
