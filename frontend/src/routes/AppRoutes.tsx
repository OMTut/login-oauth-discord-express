import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

const AppRoutes: React.FC = () => {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
      </Routes>
   )
}

export default AppRoutes;