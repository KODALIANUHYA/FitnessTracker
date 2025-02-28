const express = require('express');
const cors = require('cors');
const db = require('./models/db');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); // Enable CORS for frontend

// Import routes
const authRoutes = require('./routes/authRoutes');
const bmiRoutes = require('./routes/bmiRoutes');
const foodRoutes = require('./routes/foodRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api', authRoutes);
app.use('/api', bmiRoutes);
app.use('/api', foodRoutes);
app.use('/api', workoutRoutes);
app.use('/api', adminRoutes);
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});