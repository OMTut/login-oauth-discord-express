import React from 'react';
import { oauthService } from '../services/oauthService'

const LoginComponent: React.FC = () => {
   const handleLogin = async () => {
      try {
         await oauthService.initiateLogin()
      } catch (error) {
         console.error("Login failed:", error)
      }
   }

   return (
      <div>
         <button onClick={handleLogin}>Login with Discord</button>
      </div>
   )
}

export default LoginComponent;