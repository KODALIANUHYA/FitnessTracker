const db = require('../models/db');

exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length > 0) {
      res.json({ message: "Login successful", admin: result[0] });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
};

// Add other admin-related functions here