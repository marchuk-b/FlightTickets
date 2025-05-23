import React from 'react';
import './Footer.css';
import logo from '../../../assets/logo.png';
import facebookIcon from '../../../assets/icons/facebook.svg';
import twitterIcon from '../../../assets/icons/twitter.svg';
import instagramIcon from '../../../assets/icons/instagram.svg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__column">
            <img src={logo} alt="" className="footer__logo" />
            <p className="footer__text">Ваш надійний партнер у подорожах</p>
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Компанія</h4>
            <div className="footer__column-links">
              <a href="/about" className="footer__link">Про нас</a>
              <a href="https://www.pravda.com.ua/news/" target='_blank' className="footer__link">Новини</a>
            </div>
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Підтримка</h4>
            <div className="footer__column-links">
              <a href="https://uk.wikipedia.org/wiki/FAQ" target='_blank' className="footer__link">FAQ</a>
              <a href="/contacts" className="footer__link">Контакти</a>
            </div>
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Соціальні мережі</h4>
            <div className="footer__column-links">
              <a href="https://www.facebook.com/?locale=uk_UA" target='_blank' className="footer__link">
                <img className="footer__icon" src={facebookIcon} alt="" />Facebook
              </a>
              <a href="https://x.com/" target='_blank' className="footer__link">
                <img className="footer__icon" src={twitterIcon} alt="" />Twiter
              </a>
              <a href="https://www.instagram.com/" target='_blank' className="footer__link">
                <img className="footer__icon" src={instagramIcon} alt="" />Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer__copyright">© 2025 FlightTickets. Всі права захищені.</div>

      </div>
    </div>
  );
};

export default Footer;
