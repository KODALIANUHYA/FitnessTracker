import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import './AdminLogin.css';
const Homepage = () => {
    return (
        
        <div className="homepage-container">
            <br></br>
            <div className="admin-login-container">
            <h1 style={{ color: "white", fontSize: "40px", fontWeight: "bold", textAlign: "center" }}>FITTRACK</h1>

            <Link to="/signup">Signup</Link>
            <br /> 
            <Link to="/login">Login</Link>
            <p>If U ARE AN ADMIN 👇</p>
            <Link to="/admin-login">Login here</Link>
            </div> 
        </div>
    );
};

export default Homepage;
