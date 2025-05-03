import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './componentd/Signup';
import Login from './componentd/login';
import BillionaireList from './componentd/BillionaireList';



const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<BillionaireList/>} />


      </Routes>
    </Router>
  </StrictMode>
);
