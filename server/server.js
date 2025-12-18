// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// --- CORS Configuration ---
// This explicitly allows your Vercel frontend to communicate with Render
app.use(cors({
  origin: [
    'https://client-jobby.vercel.app', // Your exact frontend URL from screenshot
    'http://localhost:3000'           // For local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// --- Database Connection ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// --- API Routes ---
app.get('/', (req, res) => res.send('Jobby App API is running...'));

// Matches your existing route structure
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
