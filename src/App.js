import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Owner from './pages/Owner';
import University from './pages/University';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/verify" replace />} />
        <Route path="/verify" element={<Home />} />
        <Route path="/hec/verify" element={<Home />} />
        <Route path="/hec/owner" element={<Owner />} />
        <Route path="/university/verify" element={<Home />} />
        <Route path="/university/registration" element={<University />} />
      </Routes>
    </Router>
  );
}

export default App;