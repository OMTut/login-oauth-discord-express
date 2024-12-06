const express = require('express');
const getAccessTokenRoute = require('./auth/getAccessToken.js');
const getUserRoute = require('./auth/getUser.js')
require('dotenv').config();

const router = express.Router();

// Endpoint to exchange Authorization code for Access token
router.use('/token', getAccessTokenRoute);

// Endpoint to fetch user data
router.use('/user', getUserRoute);

module.exports = router;