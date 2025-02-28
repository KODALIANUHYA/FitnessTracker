import React, { useState } from 'react';
import axios from 'axios';
import './Dashboardcss.css'

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutType, setWorkoutType] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const calorieRates = {
    cardio: 5,
    strength: 6,
    pilates: 8,
    core: 5,
    aerobic: 15,
    yoga: 10,
    jogging: 17,
    briskwalk: 10,
    running: 10,
    cycling: 8,
    swimming: 12,
    walking: 5,
  };

  const calculateCalories = (type, duration) => {
    if (calorieRates[type]) {
      return calorieRates[type] * duration; 
    } else {
      return 0; 
    }
  };

  const addWorkout = async () => {
    if (!workoutType || !workoutDuration || workoutDuration <= 0) {
      alert('Please provide valid workout type and duration!');
      return; 
    }

    const calories = calculateCalories(workoutType, workoutDuration);
    const workoutData = {
      type: workoutType,
      duration: workoutDuration,
      calories,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/store-workout', workoutData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  
        },
      });

      if (response.status === 200) {
        console.log(response.data.message);
        setWorkouts([...workouts, workoutData]); 
        setWorkoutType('');
        setWorkoutDuration('');
        setCaloriesBurned(0); 
      } else {
        alert('Error storing workout data '); //error storing data
      }
    } catch (error) {
      console.error('Error storing workout data');//error storing data
      alert(' Error storing workout data.');//error storing data
    }
  };

  return (
    <div>
      <h2>Workout Tracker</h2>
      <input
        type="text"
        placeholder="Workout type"
        value={workoutType}
        onChange={(e) => setWorkoutType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={workoutDuration}
        onChange={(e) => {
          setWorkoutDuration(e.target.value);
          setCaloriesBurned(calculateCalories(workoutType, e.target.value)); // Display calories as the user enters duration
        }}
      />
      <button onClick={addWorkout}>Log Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            {`${workout.type} - ${workout.duration} minutes - Calories Burned: ${workout.calories}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutTracker;
