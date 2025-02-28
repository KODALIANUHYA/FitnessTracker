const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { sendEmailNotification } = require('../utils/emailService');

exports.storeWorkout = (req, res) => {
  const { type, duration, calories } = req.body; 
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token || !type || !duration || !calories) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const userId = decoded.id;

    db.query('SELECT email FROM users WHERE id = ?', [userId], (err, result) => {
      if (err || result.length === 0) {
        return res.status(500).json({ message: 'Error retrieving user email' });
      }

      const userEmail = result[0].email;

      const query = 'INSERT INTO workouts (user_id, type, duration, calories) VALUES (?, ?, ?, ?)';
      db.query(query, [userId, type, duration, calories], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error storing workout data', error: err });
        }

        const subject = 'Workout Logged Successfully!';
        const message = `Your ${type} workout of ${duration} minutes burning ${calories} calories has been logged. Keep going!`;

        sendEmailNotification(userEmail, subject, message);

        res.status(200).json({ message: 'Workout data stored successfully and email sent' });
      });
    });
  });
};