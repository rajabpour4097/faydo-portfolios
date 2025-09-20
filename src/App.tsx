import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BusinessCardsPage from './pages/BusinessCardsPage';
import RegistrationPage from './pages/RegistrationPage';
import MultiStepForm from './components/MultiStepForm';
import ShopDetailPage from './pages/ShopDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/business-cards" element={<BusinessCardsPage />} />
          <Route path="/shops" element={<ShopDetailPage />} />
          <Route path="/shops/:id" element={<ShopDetailPage />} />
          <Route path="/discount-info" element={<MultiStepForm />} />
          <Route path="/services" element={<div style={{padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI'}}>صفحه کارت خدمات - به زودی...</div>} />
          <Route path="/restaurants" element={<RegistrationPage />} />
          <Route path="/professionals" element={<div style={{padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI'}}>صفحه کارت متخصصان - به زودی...</div>} />
          <Route path="/education" element={<div style={{padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI'}}>صفحه کارت آموزشی - به زودی...</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
