import React from "react";
import "../pages/MealPlan.css";
import "./DietMealPlans.css"; 
const OverweightMealPlan = () => {
  return (
    <div className="meal-plan-container">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      <h2 className="title" style={{color:'white'}}>Meal Plan for Obese (BMI ≥ 25)</h2>
      <p className="goal" style={{color:'white'}}>
        🛠 <strong style={{color:'white'}}>Goal:</strong> Significant weight loss with a low-carb, high-fiber diet.
        <br />
        🔥 <strong style={{color:'white'}}>Focus on:</strong> Protein, fiber, and healthy fats while avoiding sugar.
      </p>

      <div className="meal-plans-grid">
        {/* Breakfast */}
        <div className="meal-card">
          <h3>🥣 Breakfast</h3>
          <img src="/images/boiled-eggs.jpg" alt="Boiled eggs" />
          <ul>
            <li>✅ Boiled eggs with avocado & nuts</li>
            <li>✅ Chia pudding with Greek yogurt</li>
          </ul>
        </div>

        {/* Lunch */}
        <div className="meal-card" style={{gap: '50px'}}>
          <h3>🥗 Lunch</h3>
          <img src="/images/grilled-salmon.jpg" alt="Grilled salmon" />
          <ul>
            <li>✅ Grilled salmon with sautéed vegetables</li>
            <li>✅ Mixed greens with grilled chicken</li>
          </ul>
        </div>

        {/* Snack */}
        <div className="meal-card">
          <h3>🍏 Snack</h3>
          <img src="/images/nuts.jpg" alt="Almonds and walnuts" />
          <ul>
            <li>✅ A handful of almonds and walnuts</li>
            <li>✅ Green tea & cucumber slices</li>
          </ul>
        </div>

        {/* Dinner */}
        <div className="meal-card">
          <h3>🍛 Dinner</h3>
          <img src="/images/quinoa.jpg" alt="Quinoa with chickpeas" />
          <ul>
            <li>✅ Quinoa with chickpeas & stir-fried veggies</li>
            <li>✅ Chicken or fish soup with salad</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OverweightMealPlan;
