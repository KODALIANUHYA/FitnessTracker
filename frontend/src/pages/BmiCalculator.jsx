import React, { useState } from 'react';

const BmiCalculator = () => {
  const [height, setHeight] = useState(''); // Height in cm
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  // Assuming the token is stored in localStorage after login
  const token = localStorage.getItem('token');

  const calculateBmi = () => {
    if (height && weight) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);  // Update the state with the calculated BMI
      storeBmiInDatabase(height, weight, bmiValue);  // Store the BMI in the database
    } else {
      alert('Please enter both height and weight');
    }
  };

  const storeBmiInDatabase = async (height, weight, bmi) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first');
        return;
      }
      console.log("Token to send:", token); // Debug token
  
      const response = await fetch('http://localhost:5000/api/store-bmi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          height,
          weight,
          bmi,
        }),
      });
  
      const data = await response.json();
      if (response.status === 200) {
        alert('BMI stored successfully!');
      } else {
        alert('Error storing BMI data: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error storing BMI data.');
    }
  };
  
  return (
    <div>
      <h2>BMI Calculator</h2>
      <input
        type="number"
        placeholder="Enter height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button onClick={calculateBmi}>Calculate BMI</button>

      {bmi && <p>Your BMI is: {bmi}</p>}
      <p>BMI Range <br></br> less than 18.5 : Underweight <br></br> 18.5 - 24.9 : Healthy <br></br>greater than 25 : Obese <br></br> </p>
    </div>
  );
};

export default BmiCalculator;
