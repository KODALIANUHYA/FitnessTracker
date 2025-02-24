import React from "react";
import "./DietMealPlans.css"; 

const NormalMealPlan = () => {
  return (
    <div className="meal-plan-container">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      <h2 className="title" style={{color:'white'}}>Meal Plan for Normal BMI (18.5 - 24.9)</h2>
      <p className="goal" style={{color:'white'}}>
        🛠 <strong style={{color:'white'}}>Goal:</strong> Maintain weight with a balanced diet.
        <br />
        🔥 <strong style={{color:'white'}}>Focus on:</strong> Proteins, fiber, and healthy fats.
      </p>

      <div className="meal-plans-grid">
        {/* Breakfast */}
        <div className="meal-card">
          <h3>🥣 Breakfast</h3>
          <img src="/images/greek-yogurt.jpg" alt="Greek Yogurt with Berries" />
          <ul>
            <li>✅ Greek yogurt with berries and almonds</li>
            <li>✅ Scrambled eggs with whole wheat toast</li>
          </ul>
        </div>

        {/* Lunch */}
        <div className="meal-card">
          <h3>🥗 Lunch</h3>
          <img src="/images/grilled-fish.jpg" alt="Grilled Fish with Quinoa" />
          <ul>
            <li>✅ Grilled fish with quinoa and salad</li>
            <li>✅ Lentil soup with multigrain roti</li>
          </ul>
        </div>

        {/* Snack */}
        <div className="meal-card">
          <h3>🍏 Snack</h3>
          <img src="/images/nuts-fruits.jpg" alt="Nuts and Fruit" />
          <ul>
            <li>✅ A handful of nuts & a fruit</li>
            <li>✅ Protein smoothie</li>
          </ul>
        </div>

        {/* Dinner */}
        <div className="meal-card">
          <h3>🍛 Dinner</h3>
          <img src="/images/stir-fry-tofu.jpg" alt="Stir-fried Tofu with Brown Rice" />
          <ul>
            <li>✅ Stir-fried tofu with brown rice</li>
            <li>✅ Chicken soup with veggies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NormalMealPlan;
