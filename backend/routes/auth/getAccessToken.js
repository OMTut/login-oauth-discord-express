const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI,
    DISCORD_TOKEN_URL
    } = process.env;

router.post('/token', async (req, res) => {
    const {code, codeVerifier } = req.body;

    try {
        const response = await axios.post(
           DISCORD_TOKEN_URL,
           new URLSearchParams({
              client_id: DISCORD_CLIENT_ID,
              client_secret: DISCORD_CLIENT_SECRET,
              grant_type: 'authorization_code',
              code,
              redirect_uri: DISCORD_REDIRECT_URI,
              code_verifier: codeVerifier,
           }),
           {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
        )
        res.json(response.data);
     } catch (error) {
        console.error("Error exchanging code:", error.response?.data || error.message)
        res.status(400).json({ error: "Token exchange failed" })
     }
})

module.exports = router;