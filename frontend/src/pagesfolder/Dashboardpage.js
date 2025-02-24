import React, { useEffect, useState } from "react";
import axios from "axios";
/*import BmiCalculator from "./BmiCalculator";
import CalorieTracker from "./CalorieTracker";
import WorkoutTracker from "./WorkoutTracker";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom"; // For redirecting
import "./Dashboardcss.css";
import "./Navcss.css";
*/
import BmiCalculator from "../pages/BmiCalculator";
import CalorieTracker from "../pages/CalorieTracker";
import WorkoutTracker from "../pages/WorkoutTracker";
import "../pages/Dashboardcss.css";
import "../pages/Navcss.css";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";


const Dashboardpage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect to login if no token
            return;
        }

        axios.get("http://localhost:5000/api/user-data", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
            navigate("/login"); // Redirect if fetch fails
        });
    }, [navigate]);

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="App">
            <nav className="navbar">
                <div className="navbar-left">
                    <li>
                        <a href="#">Welcome</a>
                    </li>
                </div>
                <div className="navbar-right">
                    <li>
                        <a href="/" onClick={() => localStorage.removeItem("token")}>Logout</a>
                    </li>
                </div>
            </nav>

            <h1 className="dashboard-title">Fitness Dashboard</h1>

            <div className="dashboard">
                <div className="card"><BmiCalculator /></div>
                <div className="card"><CalorieTracker /></div>
                <div className="card"><WorkoutTracker /></div>
            </div>

            {/* ✅ Display User Profile Inside Dashboard */}
            <UserProfile user={userData} />
        </div>
    );
};

export default Dashboardpage;
