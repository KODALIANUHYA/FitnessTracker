const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); // Enable CORS for frontend

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '@Nu252004', // your MySQL password
  database: 'userdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Signup Route
app.post('/api/signup', async (req, res) => {
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

      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user' });
        }

        // Call existing function to send a welcome email
        const subject = 'Welcome to FitTrack!';
        const message = `Hello ${name},\n\nWelcome to FitTrack! 🎉\nWe’re excited to have you on board.\n\nStart tracking your fitness journey today and stay healthy!\n\nBest,\nKodali Anuhya`;

        sendEmailNotification(email, subject, message);

        res.status(201).json({ message: 'User created successfully' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
});







const your_jwt_secret ="31dde0f407945d6f7fc7d99d81253caa3d4e54ec8c33e2aac1b0cfb8a45713e4";


// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: 'Server error' });
      }
      if (result.length === 0) {
          console.log("User not found");
          return res.status(400).json({ message: 'User not found' });
      }
      const user = result[0];
      try {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (!isPasswordMatch) {
              console.log("Password does not match");
              return res.status(400).json({ message: 'Invalid credentials' });
          }
          const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

          console.log("Login successful:", user.id);
          res.json({ message: 'Login successful', token, userId: user.id });
      } catch (err) {
          console.error("Error comparing password:", err);
          return res.status(500).json({ message: 'Server error' });
      }
  });
});



const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: 'smtp.gmail.com',
  port: 587, 
  secure: false,
  auth: {
    user: 'anuhyakodali111@gmail.com', // Replace with your email
    pass: 'emyv fkdk xlij atnd',  // Replace with your app password
  },
});

// Function to send email notifications
const sendEmailNotification = (email, subject, message) => {
  const mailOptions = {
    from: 'anuhyakodali111@gmail.com',
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

app.post('/api/store-bmi', (req, res) => {
  const { token, height, weight } = req.body;

  if (!token || !height || !weight) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const userId = decoded.id;

    db.query('SELECT email FROM users WHERE id = ?', [userId], (err, result) => {
      if (err || result.length === 0) {
        return res.status(500).json({ message: 'User not found' });
      }

      const userEmail = result[0].email;

      db.query('INSERT INTO bmi (user_id, height, weight, bmi) VALUES (?, ?, ?, ?)',
        [userId, height, weight, bmi], (err) => {
          if (err) return res.status(500).json({ message: 'Error storing BMI data' });

          sendEmailNotification(userEmail, 'BMI Logged Successfully',
            `FITTRACK...Your new BMI record has been added. Your BMI is: ${bmi}.`);

          res.status(200).json({ message: 'BMI data stored and email sent successfully' });
        });
    });
  });
});


app.post('/api/store-workout', (req, res) => {
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

    // Fetch user's email
    db.query('SELECT email FROM users WHERE id = ?', [userId], (err, result) => {
      if (err || result.length === 0) {
        return res.status(500).json({ message: 'Error retrieving user email' });
      }

      const userEmail = result[0].email;

      // Insert workout data into the database
      const query = 'INSERT INTO workouts (user_id, type, duration, calories) VALUES (?, ?, ?, ?)';
      db.query(query, [userId, type, duration, calories], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error storing workout data', error: err });
        }

        // Send email notification
        const subject = 'Workout Logged Successfully!';
        const message = `Your ${type} workout of ${duration} minutes burning ${calories} calories has been logged. Keep going!`;

        sendEmailNotification(userEmail, subject, message);

        res.status(200).json({ message: 'Workout data stored successfully and email sent' });
      });
    });
  });
});

app.post('/api/store-food-calories', (req, res) => {
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

    // Fetch user's email
    db.query('SELECT email FROM users WHERE id = ?', [userId], (err, result) => {
      if (err || result.length === 0) {
        return res.status(500).json({ message: 'Error retrieving user email' });
      }

      const userEmail = result[0].email;

      // Insert food calorie data into the database
      const query = 'INSERT INTO food_calories (user_id, food_name, amount, total_calories, date) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [userId, foodName, amount, totalCalories, date], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error storing food calorie data', error: err });
        }

        // Send email notification
        const subject = 'Food Calories Logged!';
        const message = `You have logged ${amount} of ${foodName} with ${totalCalories} calories on ${date}. Keep tracking your nutrition!`;

        sendEmailNotification(userEmail, subject, message);

        res.status(200).json({ message: 'Food calorie data stored successfully and email sent' });
      });
    });
  });
});













/* ADMIN MODULE*/
// 🔐 Admin Login Route
app.post('/api/admin-login', (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
      }
      
      console.log("SQL Result:", result); // Debugging

      if (result.length > 0) {
          res.json({ message: "Login successful", admin: result[0] });
      } else {
          res.status(401).json({ message: "Invalid username or password" });
      }
  });
});


// Secure Admin Dashboard API (Token validation inside this route)
app.get('/api/admin-data', (req, res) => {
  const { adminId } = req.query; // Fetch data based on the logged-in admin
  if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
  }
  const sql = "SELECT * FROM admin WHERE id = ?";
  db.query(sql, [adminId], (err, result) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length > 0) {
          res.json({ adminData: result[0] });
      } else {
          res.status(404).json({ message: "Admin not found" });
      }
  });
});



// ADMIN DASHBOARD for data 
app.get('/api/admin/users', (req, res) => {
  const sqlUsers = "SELECT id, name, email FROM users";
  const sqlBMI = "SELECT * FROM bmi";
  const sqlFoodCalories = "SELECT * FROM food_calories";
  const sqlWorkouts = "SELECT * FROM workouts"; // Fetch workouts separately

  const sql = `
      SELECT u.id, u.name, u.email, 
             b.height, b.weight, b.bmi, b.date
      FROM users u
      LEFT JOIN bmi b ON u.id = b.user_id
      WHERE b.date = (
          SELECT MAX(date) FROM bmi WHERE user_id = u.id
      ) OR b.date IS NULL;
  `;

  // Execute all queries in parallel
  db.query(sqlUsers, (err, users) => {
      if (err) {
          console.error("Database error (Users):", err);
          return res.status(500).json({ message: "Internal server error" });
      }

      db.query(sqlBMI, (err, bmiData) => {
          if (err) {
              console.error("Database error (BMI):", err);
              return res.status(500).json({ message: "Internal server error" });
          }

          db.query(sqlFoodCalories, (err, foodCaloriesData) => {
              if (err) {
                  console.error("Database error (Food Calories):", err);
                  return res.status(500).json({ message: "Internal server error" });
              }

              db.query(sqlWorkouts, (err, workoutData) => {
                  if (err) {
                      console.error("Database error (Workouts):", err);
                      return res.status(500).json({ message: "Internal server error" });
                  }

                  db.query(sql, (err, userBMIData) => {
                      if (err) {
                          console.error("Database error:", err);
                          return res.status(500).json({ message: "Internal server error" });
                      }

                      console.log("Fetched Users with BMI:", userBMIData); // Debugging

                      // ✅ Send only ONE response
                      res.json({ users, bmiData, foodCaloriesData, workoutData, userBMIData });
                  });
              });
          });
      });
  });
});



// ✅ Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.user = user;  // Store user info in request
    next();
  });
};


app.get("/api/user-profile", authenticateToken, (req, res) => {
  const userId = req.user.id;

  const userQuery = "SELECT id, name, email FROM users WHERE id = ?";
  const bmiQuery = "SELECT * FROM bmi WHERE user_id = ?";
  const workoutQuery = "SELECT * FROM workouts WHERE user_id = ?";
  const foodQuery = "SELECT * FROM food_calories WHERE user_id = ?";

  db.query(userQuery, [userId], (err, userResult) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (userResult.length === 0) return res.status(404).json({ error: "User not found" });

    db.query(bmiQuery, [userId], (err, bmiResult) => {
      if (err) return res.status(500).json({ error: "Database error" });

      db.query(workoutQuery, [userId], (err, workoutResult) => {
        if (err) return res.status(500).json({ error: "Database error" });

        db.query(foodQuery, [userId], (err, foodResult) => {
          if (err) return res.status(500).json({ error: "Database error" });

          res.json({
            user: userResult[0],
            bmi: bmiResult,
            workouts: workoutResult,
            foodCalories: foodResult,
          });
        });
      });
    });
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
