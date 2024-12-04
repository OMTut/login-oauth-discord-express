import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute: React.FC<{children: JSX.Element }> = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

   useEffect(() => {
      axios.get('http://localhost:5000/auth/check')
         .then(() => setIsAuthenticated(true))
         .catch(() => setIsAuthenticated(false))
   }, []);

   if (isAuthenticated === null) {
      return <div>Loading...</div>
   }

   return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute