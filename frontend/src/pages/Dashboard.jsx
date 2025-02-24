import React from 'react';
import BmiCalculator from './BmiCalculator';
import CalorieTracker from './CalorieTracker';
import WorkoutTracker from './WorkoutTracker';
import { Link } from 'react-router-dom';
import './Dashboardcss.css';
import './Navcss.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import MealPlan from './MealPlan';
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
    return (
      
      <div className="App1">
        <div className="App"> 
          <nav className="navbar">
            <div>
              <Avatar sx={{ bgcolor: deepOrange[500] }}><Link to="/profile" className="mr-4">P</Link></Avatar>
            </div>
            <h1 style={{fontSize:'30px'}}>FITTRACK</h1>
            
            <div className="navbar-right">
              <button className='buttonclass'><li><a href="/">Logout</a></li></button>
            </div>
          </nav> 
          <h1 className="dashboard-title">WellnessHub: Your Fitness & Nutrition Dashboard</h1>
          <div className="dashboard">
            <div className="card">
              <BmiCalculator />
            </div>

            <div className="card">
              <CalorieTracker />
            </div>

            <div className="card">
              <WorkoutTracker />
            </div>
          </div>
        </div>  
        <br></br> <br></br>  
        <div className='App-conatiner'>
              <h1 className="dashboard-title">Smart Nutrition for Smart Results!<br></br><br></br></h1>
              <div className='dashboard'>
                  <div className="card" >
                    <MealPlan />
                  </div>
                  <div className="card" > 
                      <h2 >Welcome to Our Meal Plans</h2>
                      <h3 >Find the best diet-specific meal plans for your needs.</h3>
                      <button  onClick={() => navigate("/diet-meal-plans")} >
                      Know More
                      </button>
                  </div> 
              </div>
              <br></br> <br></br> <br></br> <br></br>
        </div>
        <br></br> <br></br> 
        <div className='App-conatiner1'>
          <br></br>
          <h1 style={{color:"whitesmoke",textAlign:"center"}}>TESTIMONIALS </h1>
        <div className="dashboard" style={{alignItems:"center"}}>
            <div className="card">
             <h3>Troy M.</h3>
             <img src="https://i.pinimg.com/474x/bd/b4/0f/bdb40f1d4e9bbd22e95ca00e40ca0c27.jpg"></img>
             <p>Fittrack is an amazing gym and community .Workouts, nutrition plans, everything is tailored to your body and current fitness journey! </p>
            </div>

            <div className="card">
            <h3>Rahul K.</h3>
             <img src="https://i.pinimg.com/736x/a6/c8/2a/a6c82aa42792df2349a3af2faab83bcb.jpg" style={{height:'200px'}}></img>
             <p>"I was addicted to fast food ,but this diet helped me make better choices without feeling restricted. I learned to enjoynutritious meals that keep me full and satisfied. </p>
            </div>

            <div className="card">
            <h3>Priya S.</h3>
            <img src="https://i.pinimg.com/474x/e6/c1/30/e6c13025bd2d25511e8a5c06df7e35c2.jpg"  className="testimonial-img" /> 
             <p>"I always thought fitness was about being skinny, but this journey taught me it's about strength.Thanks to personalized meal plans,workouts, I transformed my body and mindset. I now feel healthier than ever!"</p>
            </div>
          </div>
              
          <br></br> <br></br> <br></br> <br></br>
        </div>
        
      </div>
    );
};

export default Dashboard;