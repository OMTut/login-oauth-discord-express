import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { oauthService } from '../services/oauthService'

interface ProtectedRouteProps {
   children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const location = useLocation();
   const [isLoading, setIsLoading] = React.useState(true)
   const isAuthenticated = !!localStorage.getItem('access_token')
   const hasAuthCode = new URLSearchParams(location.search).has('code')
   console.log("Is Authenticated:", isAuthenticated)
   console.log("Access Token in localStorage:", localStorage.getItem('access_token')); // Debugging
   console.log("Has Auth Code:", hasAuthCode); // Debugging

   useEffect(() => {
      const handleAuthCallback = async () => {
         if (hasAuthCode) {
            await oauthService.handleCallBack()
         }
         setIsLoading(false)
      }
      handleAuthCallback()
  }, [hasAuthCode]);

  if (isLoading) {
      return <p>Loading...</p>
   }

   if (isAuthenticated) {
      return children
   } else {
      return <Navigate to='/login' />
   }

}

export default ProtectedRoute