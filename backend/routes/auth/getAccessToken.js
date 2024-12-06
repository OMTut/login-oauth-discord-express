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

router.post('/', async (req, res) => {
    console.log("Request Body:", req.body);
    const {code, codeVerifier, timestamp } = req.body;
    const currentTime = Date.now();
    const codeAge = currentTime - timestamp;

    //Check if the code is older than 5 min (300000 ms)
    if (codeAge > 300000) {
        return res.status(400).json({ error: "Auth Code is too old" });
    }

    try {
        console.log("Exchanging code for token...");
        console.log("Code:", code);
        console.log("Code Verifier:", codeVerifier);
        console.log("Redirect URI:", DISCORD_REDIRECT_URI);
        console.log("Token URL:", DISCORD_TOKEN_URL);
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
        const { access_token } = response.data;
        console.log("Access Token:", access_token);
        res.setHeader('Content-Type', 'application/json');
        res.json({ access_token });
        
     } catch (error) {
        console.error("Error exchanging code:", error.response?.data || error.message)
        res.status(400).json({ error: "Token exchange failed" })
     }
})

module.exports = router;