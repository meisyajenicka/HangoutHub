import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import ActivityDetail from "./pages/ActivityDetail";
import MyPlan from "./pages/MyPlan";
import Profile from "./pages/Profile";
import { getUsers, saveUsers, getPlans, savePlans, getCurrentUser, setCurrentUser } from "./data/localStorage";

function App() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setPlans(getPlans());
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentUser(userData);
    setPlans(getPlans());
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentUser(null);
    setPlans([]);
  };

  const handleRegister = (name, email, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('Email sudah terdaftar');
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8B5CF6&color=fff`,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    handleLogin(newUser);
    return newUser;
  };

  const addToPlan = (activity, duration) => {
    const newPlan = {
      id: Date.now().toString(),
      ...activity,
      planDate: new Date().toISOString().split('T')[0],
      duration: duration || activity.duration,
      status: 'planned'
    };
    const updatedPlans = [...plans, newPlan];
    setPlans(updatedPlans);
    savePlans(updatedPlans);
    return newPlan;
  };

  const removeFromPlan = (id) => {
    const updatedPlans = plans.filter(p => p.id !== id);
    setPlans(updatedPlans);
    savePlans(updatedPlans);
  };

  const updatePlanStatus = (id, status) => {
    const updatedPlans = plans.map(p => p.id === id ? { ...p, status } : p);
    setPlans(updatedPlans);
    savePlans(updatedPlans);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="page-transition">
        <Routes>
          <Route path="/dashboard" element={<Dashboard user={user} plans={plans} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/activity/:id" element={<ActivityDetail onAddToPlan={addToPlan} />} />
          <Route path="/my-plan" element={<MyPlan plans={plans} onRemove={removeFromPlan} onUpdate={updatePlanStatus} />} />
          <Route path="/profile" element={<Profile user={user} plans={plans} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
