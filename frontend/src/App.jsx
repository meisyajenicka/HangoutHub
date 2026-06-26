import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import ActivityDetail from "./pages/ActivityDetail";
import MyPlan from "./pages/MyPlan";
import Profile from "./pages/Profile";
import { plansAPI } from "./api/client";

function AppContent() {
  const { user, loading } = useAuth();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (user) {
      fetchPlans();
    }
  }, [user]);

  const fetchPlans = async () => {
    try {
      const response = await plansAPI.getAll();
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const addToPlan = async (activityId, planDate, duration) => {
    try {
      const response = await plansAPI.create({ activityId, planDate, duration: duration || "2 jam" });
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-transition">
        <Routes>
          <Route path="/dashboard" element={<Dashboard user={user} plans={plans} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/activity/:id" element={<ActivityDetail onAddToPlan={addToPlan} />} />
          <Route path="/my-plan" element={<MyPlan plans={plans} onRemove={removeFromPlan} onUpdate={updatePlanStatus} />} />
          <Route path="/profile" element={<Profile user={user} plans={plans} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;