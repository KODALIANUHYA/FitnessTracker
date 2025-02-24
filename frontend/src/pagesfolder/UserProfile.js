import React from "react";

const UserProfile = ({ user }) => {
    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="user-profile">
            <h2>{user.name}'s Profile</h2>
            
            <h3>BMI Records</h3>
            <ul>
                {user.bmi.map((b, index) => (
                    <li key={index}>BMI: {b.bmi} (Date: {b.date})</li>
                ))}
            </ul>

            <h3>Food Intake</h3>
            <ul>
                {user.food.map((f, index) => (
                    <li key={index}>{f.food_name} - {f.calories} kcal</li>
                ))}
            </ul>

            <h3>Workouts</h3>
            <ul>
                {user.workouts.map((w, index) => (
                    <li key={index}>{w.type} - {w.duration} min</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
