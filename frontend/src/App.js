import './App.css';
import React from 'react';
import Footer from './components/PageComponents/Footer/Footer';
import Header from './components/PageComponents/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { FlightsPage } from './pages/FlightsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './api/AuthContext';
import { BookingPage } from './pages/BookingPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="page-wrapper">
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <FlightsPage />
                </ProtectedRoute>
              } />
              <Route path='*' element={<h1>404 Not Found</h1>} />
              <Route path='/booking' element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
