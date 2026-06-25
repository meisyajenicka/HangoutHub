import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import ActivityDetail from "./pages/ActivityDetail";
import MyPlan from "./pages/MyPlan";
import Profile from "./pages/Profile";
import { authAPI, plansAPI } from "./api/client";

function App() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cek token saat pertama kali load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Fetch plans from backend
      fetchPlans();
    }
    setLoading(false);
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await plansAPI.getAll();
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleLogin = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    fetchPlans();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPlans([]);
  };

  const addToPlan = async (activityId, planDate, duration) => {
  try {
    const response = await plansAPI.create({ 
      activityId, 
      planDate,
      duration: duration || "2 jam" // default jika tidak ada
    });
    setPlans([...plans, response.data]);
    return response.data;
  } catch (error) {
    console.error("Error adding plan:", error);
    throw error;
  }
  };

  const removeFromPlan = async (id) => {
    try {
      await plansAPI.delete(id);
      setPlans(plans.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error removing plan:", error);
    }
  };

  const updatePlanStatus = async (id, status) => {
    try {
      const response = await plansAPI.updateStatus(id, status);
      setPlans(plans.map(p => p.id === id ? response.data : p));
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '20px'
      }}>
        Loading...
      </div>
    );
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
      <Routes>
        <Route path="/dashboard" element={<Dashboard user={user} plans={plans} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/activity/:id" element={<ActivityDetail onAddToPlan={addToPlan} />} />
        <Route path="/my-plan" element={<MyPlan plans={plans} onRemove={removeFromPlan} onUpdate={updatePlanStatus} />} />
        <Route path="/profile" element={<Profile user={user} plans={plans} onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

// Navbar Component
function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none' }}>
        🎯 HangoutHub
      </Link>
      <div>
        <Link to="/dashboard" style={{ marginLeft: '20px', textDecoration: 'none', color: '#333' }}>Dashboard</Link>
        <Link to="/explore" style={{ marginLeft: '20px', textDecoration: 'none', color: '#333' }}>Explore</Link>
        <Link to="/my-plan" style={{ marginLeft: '20px', textDecoration: 'none', color: '#333' }}>My Plan</Link>
        <Link to="/profile" style={{ marginLeft: '20px', textDecoration: 'none', color: '#333' }}>Profile</Link>
        <button onClick={handleLogout} className="btn btn-danger" style={{ marginLeft: '20px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default App;