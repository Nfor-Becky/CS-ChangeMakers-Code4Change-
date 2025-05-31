
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './Pages/Homepage';
import AboutPage from './Pages/About';
import MentorsPage from './Pages/Mentor';
import InternshipsPage from './Pages/Internship';
import ServicesPage from './Pages/Service';
import Job from './Pages/Job';
import React from 'react'
import Paymentform from './Components/Paymentform';
import SendMoneyForm from './Components/SendMoneyForm';
import UsersDashboard from './Components/UsersDashboard';
import SignupPage from './Components/SignupPage';
import LearnerDashboard from './Components/LearnerDashBoard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/jobs" element={<Job />} />
      </Routes>
    </Router>
  );
};
    


export default App;
