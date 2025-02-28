import React, { useState } from 'react';
import axios from 'axios';

const CalorieTracker = () => {
  const [foodLog, setFoodLog] = useState([]); // State to store the list of food logs
  const [foodName, setFoodName] = useState(''); // Food name (e.g., Apple, Banana)
  const [amount, setAmount] = useState(''); // Amount of food consumed (e.g., 1, 200 grams)
  const [caloriesPerUnit, setCaloriesPerUnit] = useState(''); // Calories per unit of the food

  // A simple object to store calorie information per unit of different food types
  const calorieRates = {
    apple: 52,        // 52 calories per 100g
    banana: 89,       // 89 calories per 100g
    orange: 47,       // 47 calories per 100g
    rice: 130,        // 130 calories per 100g
    chicken: 239,     // 239 calories per 100g
    bread: 265,       // 265 calories per 100g
    egg: 155,         // 155 calories per 100g
    milk: 42,         // 42 calories per 100ml
    roti: 150,        // 150 calories per 100g
  chapati: 120,     // 120 calories per 100g
  dal: 120,         // 120 calories per 100g
  chickencurry: 200, // 200 calories per 100g
  butterchicken: 230, // 230 calories per 100g
  biryani: 150,     // 150 calories per 100g
  samosa: 250,      // 250 calories per 100g
  paneer: 265,      // 265 calories per 100g
  yogurt: 60,       // 60 calories per 100g
  lassi: 80,        // 80 calories per 100g
  chapatighee: 180, // 180 calories per 100g
  alooparatha: 210, // 210 calories per 100g
  pavbhaji: 250,   // 250 calories per 100g
  cholebhature: 270, // 270 calories per 100g
  upma: 160,        // 160 calories per 100g
  kachori: 230, 
  poha: 130,         // 130 calories per 100g
  idli: 50,          // 50 calories per 100g
  dosa: 160,         // 160 calories per 100g
  masaladosa: 180,  // 180 calories per 100g (with filling)
  paratha: 180,      // 180 calories per 100g
  alooparatha: 210, // 210 calories per 100g
  breadpakora: 250, // 250 calories per 100g
  cholebhature: 270,// 270 calories per 100g
  muthiya: 160,      // 160 calories per 100g
  thepla: 150,       // 150 calories per 100g
  khakra: 150,       // 150 calories per 100g
  eggbhurji: 150,   // 150 calories per 100g
  omelette: 150,     // 150 calories per 100g
  poori: 300,        // 300 calories per 100g
  uttapam: 180,      // 180 calories per 100g
  misalpav: 350,    // 350 calories per 100g
  sabudanakhichdi: 130, // 130 calories per 100g
  sevpuri: 230,     // 230 calories per 100g
  pavbhaji: 250,    // 250 calories per 100g
  upmarava: 170,pizza: 266,          // 266 calories per 100g
  hamburger: 250,      // 250 calories per 100g
  spaghettibolognese: 250,  // 250 calories per 100g
  sushi: 200,          // 200 calories per 100g
  burrito: 200,        // 200 calories per 100g
  tacos: 150,          // 150 calories per 100g
  falafel: 330,        // 330 calories per 100g
  padthai: 180,       // 180 calories per 100g
  lasagna: 275,        // 275 calories per 100g
  croissant: 380,      // 380 calories per 100g
  frenchfries: 312,   // 312 calories per 100g
  hotdog: 150,        // 150 calories per 100g
  chowmein: 150,      // 150 calories per 100g
  chickenfriedrice: 190,  fish_and_chips: 232, 
  quesadilla: 290,     // 290 calories per 100g
  risotto: 130,        // 130 calories per 100g
  pancakes: 227,       // 227 calories per 100g
  cheeseburger: 250,   // 250 calories per 100g
  fajitas: 220,        // 220 calories per 100g
  gyros: 200,          // 200 calories per 100g
  roast_chicken: 165,  // 165 calories per 100g
  paella: 170,         // 170 calories per 100g
  beef_stew: 180,      // 180 calories per 100g
  dumplings: 250,      // 250 calories per 100g
  chicken_wings: 203,  // 203 calories per 100g
  ravioli: 220,        // 220 calories per 100g
  spring_rolls: 210,   // 210 calories per 100g
  cannoli: 320,        // 320 calories per 100g
  moussaka: 250,    
  };

  // Function to calculate total calories consumed based on the food type and amount
  const calculateTotalCalories = (foodType, amount) => {
    if (calorieRates[foodType]) {
      const caloriesPer100g = calorieRates[foodType]; // Get calories per 100g for the selected food
      const totalCalories = (caloriesPer100g * amount) / 100; // Calculate total calories based on the amount
      return totalCalories.toFixed(2); // Round the total calories to two decimal places
    } else {
      return 0; 
    }
  };

  const addFoodLog = async () => {
    if (!foodName || !amount) {
      alert('Please provide valid food name and amount!');
      return; // Don't proceed if any required fields are empty
    }

    // Calculate total calories based on the food type and amount
    const totalCalories = calculateTotalCalories(foodName.toLowerCase(), Number(amount));

    const foodData = {
      foodName,
      amount: Number(amount),
      totalCalories,
      date: new Date().toISOString().split('T')[0], // Current date (YYYY-MM-DD)
    };

    // Send data to the backend for storage
    try {
      const response = await axios.post('http://localhost:5000/api/store-food-calories', foodData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token for user authentication
        },
      });
      console.log(response.data.message);
      setFoodLog([...foodLog, foodData]); // Update the food log list
      setFoodName(''); // Reset the food name
      setAmount(''); // Reset the amount input
    } catch (error) {
      console.error(' Error storing food calorie data:');//error storing data
      alert(' Error storing food calorie data.');//error storing data
    }
  };

  // Calculate total calories consumed so far
  const totalCaloriesConsumed = foodLog.reduce((total, food) => total + parseFloat(food.totalCalories), 0);

  return (
    <div>
      <h2>Calorie Tracker</h2>

      <input
        type="text"
        placeholder="Food Name (e.g., Apple)"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (grams)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addFoodLog}>Log Food</button>

      <ul>
        {foodLog.map((log, index) => (
          <li key={index}>
            {log.foodName} - {log.amount} grams - Total Calories: {log.totalCalories} - Date: {log.date}
          </li>
        ))}
      </ul>

      <p>Total Calories Consumed: {totalCaloriesConsumed.toFixed(2)} kcal</p> {/* Display total calories */}
    </div>
  );
};

export default CalorieTracker;
