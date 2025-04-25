import './App.css';
import React from 'react';
import Footer from './components/PageComponents/Footer/Footer';
import Header from './components/PageComponents/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<h1>Головна сторінка</h1>} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
