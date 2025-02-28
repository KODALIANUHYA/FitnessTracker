const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { sendEmailNotification } = require('../utils/emailService');

const your_jwt_secret = "31dde0f407945d6f7fc7d99d81253caa3d4e54ec8c33e2aac1b0cfb8a45713e4";

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user' });
        }

        const subject = 'Welcome to FitTrack!';
        const message = `Hello ${name},\n\nWelcome to FitTrack! 🎉\nWe’re excited to have you on board.\n\nStart tracking your fitness journey today and stay healthy!\n\nBest,\nKodali Anuhya`;

        sendEmailNotification(email, subject, message);

        res.status(201).json({ message: 'User  created successfully' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.length === 0) {
      console.log("User  not found");
      return res.status(400).json({ message: 'User  not found' });
    }
    const user = result[0];
    try {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        console.log("Password does not match");
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id }, your_jwt_secret, { expiresIn: '1h' });

      console.log("Login successful:", user.id);
      res.json({ message: 'Login successful', token, userId: user.id });
    } catch (err) {
      console.error("Error comparing password:", err);
      return res.status(500).json({ message: 'Server error' });
    }
  });
};