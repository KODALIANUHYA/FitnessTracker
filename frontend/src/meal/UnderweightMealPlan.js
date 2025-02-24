import React from "react";
import "./DietMealPlans.css"; 

const UnderweightMealPlan = () => {
  return (
    <div className="meal-plan-container">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      <h2 className="title" style={{color:'white'}}>Meal Plan for Underweight (BMI &lt; 18.5)</h2>
      <p className="goal" style={{color:'white'}}>
        🛠 <strong style={{color:'white'}}>Goal:</strong> Gain weight by increasing calorie intake with nutrient-dense foods.
        <br />
        🔥 <strong style={{color:'white'}}>Focus on:</strong> Healthy fats, proteins, and complex carbs.
      </p>

      <div className="meal-plans-grid">
        {/* Breakfast */}
        <div className="meal-card">
          <h3>🥣 Breakfast</h3>
          <img src="/images/oatmeal.jpg" alt="Oatmeal with Nuts and Honey" />
          <ul>
            <li>✅ Oatmeal with whole milk, nuts, and honey</li>
            <li>✅ 2 boiled eggs + banana smoothie</li>
          </ul>
        </div>

        {/* Lunch */}
        <div className="meal-card">
          <h3>🥗 Lunch</h3>
          <img src="/images/grilled-chicken.jpg" alt="Brown Rice with Grilled Chicken" />
          <ul>
            <li>✅ Brown rice with grilled chicken & veggies</li>
            <li>✅ Avocado toast with boiled eggs</li>
          </ul>
        </div>

        {/* Snack */}
        <div className="meal-card">
          <h3>🍏 Snack</h3>
          <img src="/images/peanut-butter-toast.jpg" alt="Peanut Butter with Whole Wheat Bread" />
          <ul>
            <li>✅ Peanut butter with whole wheat bread</li>
            <li>✅ Dry fruits & nuts</li>
          </ul>
        </div>

        {/* Dinner */}
        <div className="meal-card">
          <h3>🍛 Dinner</h3>
          <img src="/images/salmon.jpg" alt="Salmon with Roasted Sweet Potatoes" />
          <ul>
            <li>✅ Quinoa with lentils & paneer</li>
            <li>✅ Salmon with roasted sweet potatoes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnderweightMealPlan;
