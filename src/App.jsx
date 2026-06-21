import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import ActivityDetail from "./pages/ActivityDetail";
import MyPlan from "./pages/MyPlan";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cek localStorage saat pertama kali load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedPlans = localStorage.getItem("plans");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
    setLoading(false);
  }, []);

  // Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("plans");
  };

  const addToPlan = (activity) => {
    const newPlan = {
      ...activity,
      id: Date.now().toString(),
      planDate: new Date().toISOString().split("T")[0],
      status: "planned"
    };
    setPlans([...plans, newPlan]);
  };

  const removeFromPlan = (id) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const updatePlanStatus = (id, status) => {
    setPlans(plans.map(p => p.id === id ? { ...p, status } : p));
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