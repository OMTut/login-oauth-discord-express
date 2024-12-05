const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const {
    DISCORD_USER_URL,
    } = process.env;

router.get('/user', async (req, res) => {
    const { access_token } = req.query;
    if (!access_token) {
        return res.status(400).send('Missing token from Discord');
     }

    try {
        const response = await axios.get(DISCORD_USER_URL, {
            headers: { Authorization: `Bearer ${access_token}`},
        })
        res.json(response.data);

    } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
        res.status(400).json({ error: "User fetch failed"});
    }
})

module.exports = router;