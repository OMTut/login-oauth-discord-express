const express = require('express');
const getAccessTokenRoute = require('./auth/getAccessToken.js');
const getUserRoute = require('./auth/getUser.js')
require('dotenv').config();

const router = express.Router();

// Endpoint to exchange Authorization code for Access token
router.use('/token', getAccessTokenRoute);

// Endpoint to fetch user data
router.use('/user', getUserRoute);

// Route to handle the callback from Discord
// router.get('/callback', async (req, res) => {
//    const code = req.query.code; // Get the auth code from Discord
//    if (!code) {
//       return res.status(400).send('Missing code from Discord');
//    }

//    try {
//       // Exchange auth code for access token
//       const tokenResponse = await axios.post(
//          'https://discord.com/api/oauth2/token',
//          new URLSearchParams({
//             client_id: DISCORD_CLIENT_ID,
//             client_secret: DISCORD_CLIENT_SECRET,
//             grant_type: 'authorization_code',
//             code,
//             redirect_uri: DISCORD_REDIRECT_URI,
//          }),
//          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//       );

//       const { access_token } = tokenResponse.data;

//       //Use the token to fetch user info
//       const userResponse = await axios.get('https://discord.com/api/users/@me', {
//          headers: {
//             Authorization: `Bearer ${access_token}`,
//          },
//       })

//       const user = userResponse.data;

//       // send the user data as a response
//       res.json ({user})
//    } catch (err) {
//       console.error(err);
//       res.status(500).send('Authentication failed')
//    }
// });

module.exports = router;