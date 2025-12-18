// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ... (Route Imports)
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 5001;


// server/server.js
app.use(cors({
  origin: 'https://client-jobby.vercel.app/login', // Replace with your actual Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

// ... (Database Connection and the rest of the file remains the same)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => res.send('Jobby App API is running...'));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
