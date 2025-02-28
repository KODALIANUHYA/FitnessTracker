const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { sendEmailNotification } = require('../utils/emailService');

exports.storeFoodCalories = (req, res) => {
  const { foodName, amount, totalCalories, date } = req.body;
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
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

      db.query('INSERT INTO food_calories (user_id, food_name, amount, total_calories, date) VALUES (?, ?, ?, ?, ?)',
        [userId, foodName, amount, totalCalories, date], (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error storing food calorie data', error: err });
          }

          const subject = 'Food Calories Logged!';
          const message = `You have logged ${amount} of ${foodName} with ${totalCalories} calories on ${date}. Keep tracking your nutrition!`;

          sendEmailNotification(userEmail, subject, message);

          res.status(200).json({ message: 'Food calorie data stored successfully and email sent' });
        });
    });
  });
};