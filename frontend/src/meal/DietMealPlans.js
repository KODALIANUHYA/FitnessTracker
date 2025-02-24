import React from "react";
import "./DietMealPlans.css"; // Import the CSS file
import { Link } from 'react-router-dom';
const DietMealPlans = () => {
  const mealPlans = [
    { 
      title: "🌱 Vegetarian Plan", 
      description: "Pure plant-based meals for a healthy lifestyle.", 
      image: "https://i.pinimg.com/736x/54/5d/95/545d9540caced7670d3287c65006424a.jpg",
      className: "vegetarian"
    },
    { 
      title: "🥩 High-Protein Plan", 
      description: "Protein-rich meals for muscle growth and strength.", 
      image: "https://i.pinimg.com/736x/1a/d5/d0/1ad5d0b020e9ca3b16e20968eb25c78a.jpg",
      className: "high-protein"
    },
    { 
      title: "🥑 Keto Plan", 
      description: "Low-carb, high-fat meals for energy and weight loss.", 
      image: "https://i.pinimg.com/736x/a5/ac/53/a5ac53baaba6ba2f3a05ffcf9d197fa5.jpg",
      className: "keto"
    },
    { 
      title: "🍚 Low-Carb Plan", 
      description: "Smart carb choices for a balanced diet.", 
      image: "https://i.pinimg.com/736x/45/60/04/456004fa21ad7eec07200ead410974d3.jpg",
      className: "low-carb"
    }
  ];

  return (
    <div className="meal-plans-container">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      <h2 className="heading" style={{color:'white'}}>🍽️ Diet-Specific Meal Plans</h2>
      <div className="meal-plans-grid">
        
        {mealPlans.map((plan, index) => (
          <div key={index} className="meal-card">
            <img src={plan.image} alt={plan.title} className="meal-image" />
            <h3 className="meal-title">{plan.title}</h3>
            <p className="meal-description">{plan.description}</p>
            <button className="view-plan-btn"><Link to="/NOplan">View Plan</Link></button>
          </div>
        ))}
        <br></br>
      </div>
    </div>
  );
};

export default DietMealPlans;
