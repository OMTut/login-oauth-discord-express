const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const {
   DISCORD_CLIENT_ID,
   DISCORD_CLIENT_SECRET,
   DISCORD_REDIRECT_URI,
   } = process.env;

// Redirect to Discord's OAuth2 endpoint
router.get('/discord', (req, res) => {
   const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT_URI}&response_type=code&scope=identify%20email`;
   res.redirect(discordAuthUrl);
})

// Route to handle the callback from Discord
router.get('/callback', async (req, res) => {
   const code = req.query.code; // Get the auth code from Discord
   if (!code) {
      return res.status(400).send('Missing code from Discord');
   }

   try {
      // Exchange auth code for access token
      const tokenResponse = await axios.post(
         'https://discord.com/api/oauth2/token',
         new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: DISCORD_REDIRECT_URI,
         }),
         { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      const { access_token } = tokenResponse.data;

      //Use the token to fetch user info
      const userResponse = await axios.get('https://discord.com/api/users/@me', {
         headers: {
            Authorization: `Bearer ${access_token}`,
         },
      })

      const user = userResponse.data;

      // send the user data as a response
      res.json ({user})
   } catch (err) {
      console.error(err);
      res.status(500).send('Authentication failed')
   }
});

module.exports = router;