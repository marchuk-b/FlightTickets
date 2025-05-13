import './App.css';
import Footer from './components/PageComponents/Footer/Footer';
import Header from './components/PageComponents/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { FlightsPage } from './pages/FlightsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './api/AuthContext';
import { BookingPage } from './pages/BookingPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { ConfirmBookingPage } from './pages/ConfirmBookingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
              <Route path='/booking/:flightId' element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } />
              <Route path='/:userId/confirm/:flightId' element={
                <ProtectedRoute>
                  <ConfirmBookingPage />
                </ProtectedRoute>
              } />
              <Route path='/profile' element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path='/edit' element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              } />
            </Routes>
              <ToastContainer position="top-right" autoClose={3000} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
