import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
   children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const location = useLocation();
   const isAuthenticated = !!localStorage.getItem('access_token')
   const hasAuthCode = new URLSearchParams(location.search).has('code')
   console.log("Is Authenticated:", isAuthenticated)
   console.log("Is Authenticated:", isAuthenticated); // Debugging
   console.log("Access Token in localStorage:", localStorage.getItem('access_token')); // Debugging
   console.log("Has Auth Code:", hasAuthCode); // Debugging

   if (isAuthenticated) {
      return children
   } else if (hasAuthCode) {
      return children
   } else {
      return <Navigate to='/login' />
   }

}

export default ProtectedRoute