import React, { useEffect, useState } from 'react';
import {oauthService} from "../services/oauthService";
import {apiService} from "../services/api";

const Dashboard: React.FC = () => {
   const [userData, setUserData] = useState<any>(null);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const handleAuth = async () => {
         try {
            console.log("Dashbaord component mounted")
            await oauthService.handleCallBack();
            const user = await apiService.getUserData();
            setUserData(user)
         } catch (err: any) {
            setError(err.message)
         }
      }
      handleAuth();
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
      </div>
   )
}

export default Dashboard;