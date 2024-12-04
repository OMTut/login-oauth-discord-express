import React from 'react';

const LoginComponent: React.FC = () => {
   const handleLogin = () => {
      window.location.href = 'http://localhost:5000/auth/discord';
   }

   return (
      <div>
         <button onClick={handleLogin}>Login with Discord</button>
      </div>
   )
}

export default LoginComponent;