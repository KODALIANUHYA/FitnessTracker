import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
const MealPlan = () => {
  const [bmi, setBmi] = useState("");
  const navigate = useNavigate();

  const handleMealPlanRedirect = () => {
    if (bmi < 18.5) {
      navigate("/meal-plan/underweight");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      navigate("/meal-plan/normal");
    } else {
      navigate("/meal-plan/overweight");
    }
  };

  return (
    <div className="meal-selection">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      <h2> BMI-Based Meal Plan</h2>
      <input
        type="number"
        value={bmi}
        onChange={(e) => setBmi(e.target.value)}
        placeholder="Enter your BMI"
      />
      <br></br> <br></br> 
      <button onClick={handleMealPlanRedirect}>Get Meal Plan</button>
    </div>
  );
};

export default MealPlan;
