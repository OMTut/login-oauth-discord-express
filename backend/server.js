const express = require('express');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Use the auth routes
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
})

