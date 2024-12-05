const express = require('express');
const cors = require('cors')
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all
app.use(cors())

// Middleware to parse JSON. Applies to all routes
app.use(express.json());

// Use the auth routes (auth manages all the routes related to authorizatin)
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
})

