import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path ="/dashboard" element={<Dashboard />} />
      </Routes>
   )
}

export default AppRoutes;