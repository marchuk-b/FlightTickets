import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/logo.png';
import { useAuth } from '../../../api/AuthContext';

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const isAuthenticated = useMemo(() => !!user, [user]);

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
              <Link to="/" className="header__link" onClick={handleNavLinkClick}>Головна</Link>
              <Link to="/flights" className="header__link" onClick={handleNavLinkClick}>Рейси</Link>
              <Link to="/about" className="header__link" onClick={handleNavLinkClick}>Про нас</Link>
              <Link to="/contacts" className="header__link" onClick={handleNavLinkClick}>Контакти</Link>
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
              {!loading && !isAuthenticated && (
                <button className="header__btn">
                  <Link to="/login" className="header__btn-link">Увійти</Link>
                </button>
              )}
              {!loading && isAuthenticated && (
                <button className="header__btn" onClick={logout}>
                  <span className="header__btn-link">Вийти</span>
                </button>
              )}
            </div>

          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
