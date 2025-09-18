import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BusinessCardsPage from './pages/BusinessCardsPage';
import MultiStepForm from './components/MultiStepForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business-cards" element={<BusinessCardsPage />} />
          <Route path="/shops" element={<div style={{padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI'}}>صفحه کارت فروشگاه‌ها - به زودی...</div>} />
          <Route path="/discount-info" element={<MultiStepForm />} />
          <Route path="/services" element={<div style={{padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI'}}>صفحه کارت خدمات - به زودی...</div>} />
          <Route path="/restaurants" element={<div style={{padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI'}}>صفحه کارت رستوران‌ها - به زودی...</div>} />
          <Route path="/professionals" element={<div style={{padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI'}}>صفحه کارت متخصصان - به زودی...</div>} />
          <Route path="/education" element={<div style={{padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI'}}>صفحه کارت آموزشی - به زودی...</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
