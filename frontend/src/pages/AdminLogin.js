import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import "./Login.css";
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin-login", { username, password });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin-dashboard"); // Redirect to Admin Dashboard
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="admin-login-container">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      <h2> HELLO ADMIN Login 👋</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
        <p>Not a Admin</p>
        <button ><li><a href="/">Back</a></li></button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
