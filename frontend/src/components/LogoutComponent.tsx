import Reat from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent: React.FC = () => {
   const navigate = useNavigate()

   const handleLogout = () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('pkce_code_verifier')
      localStorage.removeItem('auth_code_timestamp')
      navigate('/')
   }

   return (
      <button onClick={handleLogout}>Logout</button>
   )
}

export default LogoutComponent;