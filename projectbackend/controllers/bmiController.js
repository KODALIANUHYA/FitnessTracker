const jwt = require('jsonwebtoken');
const db = require('../models/db');

exports.storeBmi = (req, res) => {
  const { token, height, weight } = req.body;

  if (!token || !height || !weight) {
    return res.sendStatus(400); // Bad Request
  }

  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    

    const userId = decoded.id;

    db.query('SELECT email FROM users WHERE id = ?', [userId], (err, result) => {
      if (err || result.length === 0) {
        return res.sendStatus(500); // Internal Server Error
      }

      const userEmail = result[0].email;

      db.query(
        'INSERT INTO bmi (user_id, height, weight, bmi) VALUES (?, ?, ?, ?)',
        [userId, height, weight, bmi],
        (err) => {
          if (err) {
            return res.sendStatus(500);
          }

          sendEmailNotification(userEmail, 'BMI Logged Successfully', `Your new BMI record has been added. Your BMI is: ${bmi}.`);

          res.sendStatus(200); // Success
        }
      );
    });
  });
};
