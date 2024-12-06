import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { oauthService } from "../services/oauthService";

const HomePage: React.FC = () => {
  
  const navigate = useNavigate();
  const handleDashboardClick = async () => {
    const isAuthenticated = !!localStorage.getItem('access_token')
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div>
      <h1>Welcome Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <button onClick={handleDashboardClick}>Dashboard</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;