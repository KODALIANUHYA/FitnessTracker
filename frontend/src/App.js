import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import UserProfile from './pages/UserProfile';
import UnderweightMealPlan from './meal/UnderweightMealPlan';
import NormalMealPlan from './meal/NormalMealPlan';
import OverweightMealPlan from './meal/OverweightMealPlan';
import DietMealPlans from './meal/DietMealPlans';
import DietSpecific from './meal/DietSpecific';
import Noplan from './meal/Noplan';

const App = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return (
        <Router>
            <Routes>
                {/* Update component to element */}
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
                <Route path="/meal-plan/underweight" element={<UnderweightMealPlan />} />
                <Route path="/meal-plan/normal" element={<NormalMealPlan />} />
                <Route path="/meal-plan/overweight" element={<OverweightMealPlan />} />
                <Route path="/diet-meal-plans" element={<DietMealPlans />} />
                <Route path="/diet-meal" element={<DietSpecific />} />
                <Route path="/NOplan" element={<Noplan/>}/>
            </Routes>
        </Router>
    );
};

export default App;
