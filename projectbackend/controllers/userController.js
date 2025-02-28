// controllers/userController.js

const db = require('../models/db');

exports.getUserProfile = (req, res) => {
  const userId = req.user.id;

  const userQuery = "SELECT id, name, email FROM users WHERE id = ?";
  const bmiQuery = "SELECT * FROM bmi WHERE user_id = ?";
  const workoutQuery = "SELECT * FROM workouts WHERE user_id = ?";
  const foodQuery = "SELECT * FROM food_calories WHERE user_id = ?";

  db.query(userQuery, [userId], (err, userResult) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (userResult.length === 0) return res.status(404).json({ error: "User  not found" });

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
};