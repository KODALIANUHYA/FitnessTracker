import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminLogin.css";
import './Navcss.css';
import './Login.css';
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bmiData, setBmiData] = useState([]);
  const [foodCaloriesData, setFoodCaloriesData] = useState([]);
  const [userBMIData, setUserBMIData] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users")
      .then((response) => {
        setUsers(response.data.users);
        setBmiData(response.data.bmiData);
        setFoodCaloriesData(response.data.foodCaloriesData);
        setUserBMIData(response.data.userBMIData);
        setWorkoutData(response.data.workoutData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="admin-dashboard">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      <nav className="navbar">
            <div className="navbar-right">
              <li>
                <a href="/">Logout</a>
              </li>
            </div>
          </nav>
          <h2 style={{ textAlign: "center", fontSize: "42px", marginTop: "20px", fontWeight: "bold", color: "white" }}>
  ADMIN DASHBOARD
</h2>

<br></br>
      {/* User + BMI Data Table */}
      <h2 style={{textAlign: "center",color:"white"}}>USERS WITH LATEST BMI</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Height (cm)</th>
            <th>Weight (kg)</th>
            <th>BMI</th>
            <th>Date Recorded</th>
          </tr>
        </thead>
        <tbody>
          {userBMIData.length > 0 ? (
            userBMIData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.height ?? "N/A"}</td>
                <td>{user.weight ?? "N/A"}</td>
                <td>{user.bmi ?? "N/A"}</td>
                <td>
                  {user.date ? new Date(user.date).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Users Table */}
      <h2 style={{textAlign: "center",color:"white"}}>USERS TABLE</h2>
      <table className="user-table" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* BMI Data Table */}
      <h2 style={{textAlign: "center",color:"white"}}>BMI TABLE</h2>
      <table className="user-table" border="1">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Height (cm)</th>
            <th>Weight (kg)</th>
            <th>BMI</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bmiData.length > 0 ? (
            bmiData.map((bmi) => (
              <tr key={bmi.id}>
                <td>{bmi.user_id}</td>
                <td>{bmi.height}</td>
                <td>{bmi.weight}</td>
                <td>{bmi.bmi}</td>
                <td>{new Date(bmi.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No BMI records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Food Calories Table */}
      <h2 style={{textAlign: "center",color:"white"}}>FOOD CALORIES TABLE</h2>
      <table className="user-table" border="1">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Food Name</th>
            <th>Amount (g)</th>
            <th>Total Calories</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {foodCaloriesData.length > 0 ? (
            foodCaloriesData.map((food) => (
              <tr key={food.id}>
                <td>{food.user_id}</td>
                <td>{food.food_name}</td>
                <td>{food.amount}</td>
                <td>{food.total_calories}</td>
                <td>{new Date(food.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No food calorie records found</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Calories Table (Workouts) */}
<h2 style={{textAlign: "center",color:"white"}}>WORKOUT TABLE</h2>
<table className="user-table" border="1">
  <thead>
    <tr>
      <th>User ID</th>
      <th>Workout Type</th>
      <th>Duration (minutes)</th>
      <th>Calories Burned</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {workoutData.length > 0 ? (
      workoutData.map(workout => (
        <tr key={workout.id}>
          <td>{workout.user_id}</td>
          <td>{workout.type}</td>
          <td>{workout.duration}</td>
          <td>{workout.calories}</td>
          <td>{new Date(workout.date).toLocaleDateString()}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5">No workout records found</td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default AdminDashboard;
