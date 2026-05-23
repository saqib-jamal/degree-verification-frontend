import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Owner from './pages/Owner';
import University from './pages/University';
import Student from './pages/Student';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/university" element={<University />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </Router>
  );
}

export default App;