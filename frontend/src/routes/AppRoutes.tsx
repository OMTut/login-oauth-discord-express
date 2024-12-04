import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path ="/dashboard" 
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
   )
}

export default AppRoutes;