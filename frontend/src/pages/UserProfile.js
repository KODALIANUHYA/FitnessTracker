import { useEffect, useState } from "react";
import axios from "axios";
import './styles.css';
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
        console.error("No token found");
        return <div className="text-center text-gray-500">No token, please log in</div>;
      }
    const fetchUser = async () => {   
      try {
        const response = await axios.get("http://localhost:5000/api/user-profile", {
            headers: { Authorization: `Bearer ${token}` },  // Add "Bearer " before token
          });
          

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUser();
  }, [token]);

  if (!user) {
    return <div className="text-center text-gray-500">Loading user details...</div>;
  }

  return (
    <div className="profile-container">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
  <h2 className="profile-title" style={{textAlign: "center",color:"black",fontSize:"42px"}}>TRACK UR RECORDS</h2>

 
  <h3 className="section-title" style={{textAlign: "center",color:"purple"}}>BMI RECORDS</h3>  
  {user.bmi.length > 0 ? (
    <ul className="data-list">  
      {user.bmi.map((b, index) => (
        <li key={index}>{b.date}: Height {b.height}cm, Weight {b.weight}kg, BMI {b.bmi}</li>
      ))}
    </ul>
  ) : <p className="no-data">No BMI records found</p>}


  {/* Workout History */}
  <h3 className="section-title" style={{textAlign: "center",color:"purple"}}>WORKOUT HISTORY</h3>
  {user.workouts.length > 0 ? (
    <ul className="data-list">
      {user.workouts.map((w, index) => (
        <li key={index}>{w.date} : {w.type}, <br></br>{w.duration} mins&nbsp; {w.calories} kcal burned</li>
      ))}
    </ul>
  ) : <p className="no-data">No workout records found</p>}

  {/* Food Intake  */}                     
  <h3 className="section-title" style={{textAlign: "center",color:"purple"}}>KNOW UR CALORIES INTAKE</h3> 
  {user.foodCalories.length > 0 ? (
    <ul className="data-list">
      {user.foodCalories.map((f, index) => (
        <li key={index}>{f.date}: {f.foodName}, {f.amount}g, {f.totalCalories} kcal</li>
      ))}     
    </ul>
  ) : <p className="no-data">No food records found</p>}
  <button>
    <Link to="/dashboard" className="mr-4">BACK</Link>
  </button> 
</div>

  );
};

export default UserProfile;
