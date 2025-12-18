const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// 1. ADVANCED CORS CONFIGURATION
// This allows your Vercel frontend to bypass the security block
app.use(cors({
    origin: [
        'https://client-jobby.vercel.app', // Your Vercel URL from screenshot
        'http://localhost:3000'           // Local development
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// 2. DATABASE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// 3. API ROUTES
// Root route for health check
app.get('/', (req, res) => res.send('Jobby App API is running...'));

// Registering the routes
// Note: Ensure your frontend calls `${process.env.REACT_APP_API_URL}/api/auth/login`
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// 4. SERVER START
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
