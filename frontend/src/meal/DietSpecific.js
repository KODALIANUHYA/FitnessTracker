import React from 'react'
import { useNavigate } from "react-router-dom";

const DietSpecific = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div class="bg"></div>

<div class="star-field">
<div class="layer"></div>
<div class="layer"></div>
<div class="layer"></div>
</div>
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Meal Plans</h1>
      <p className="text-gray-600 mb-4">Find the best diet-specific meal plans for your needs.</p>      
      <button 
        onClick={() => navigate("/diet-meal-plans")} 
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
      >
        Know More
      </button>
    </div>
  )
}

export default DietSpecific
