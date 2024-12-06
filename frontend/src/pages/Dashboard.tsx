import React, { useEffect, useState } from 'react';
import {apiService} from "../services/api";
import LogoutComponent from '../components/LogoutComponent';

const Dashboard: React.FC = () => {
   const [userData, setUserData] = useState<any>(null);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            console.log("Dashboard component mounted")
            const user = await apiService.getUserData()
            setUserData(user)
         } catch (err: any) {
            setError(err.message)
         }
      }
      fetchUserData()
   }, [])

   if (error) {
      return <p>Error: {error}</p>
   }
   if (!userData) {
      return <p>Loading...</p>
   }
   return (
      <div>
         <h1>Dashboard</h1>
         <p> Welcome, {userData.username}#{userData.discriminator}</p>
         <img
            src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`}
            alt="User Avatar"
            />
         <LogoutComponent />
      </div>
   )
}

export default Dashboard;