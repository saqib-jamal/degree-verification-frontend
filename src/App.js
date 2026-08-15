import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DegreeVerification from './pages/Home';
import Owner from './pages/Owner';
import University from './pages/University';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DegreeVerification />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/university" element={<University />} />
      </Routes>
    </Router>
  );
}

export default App;