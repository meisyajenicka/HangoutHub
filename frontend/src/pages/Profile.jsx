import { useNavigate } from "react-router-dom";

export default function Profile({ user, plans, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const totalPlans = plans.length;
  const completedPlans = plans.filter(p => p.status === "completed").length;
  const completionRate = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;

  return (
    <div className="container fade-in" style={{ maxWidth: '500px' }}>
      <div className="profile-header">
        <div className="avatar">👤</div>
        <h2 className="profile-name">{user?.name}</h2>
        <p className="profile-email">{user?.email}</p>
      </div>

      <div className="profile-stats">
        <div style={{ textAlign: 'center' }}>
          <div className="profile-stat-number">{totalPlans}</div>
          <div className="profile-stat-label">Total Plans</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="profile-stat-number">{completedPlans}</div>
          <div className="profile-stat-label">Completed</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }}>
          <span style={{ color: '#666' }}>Member since</span>
          <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2026'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0' }}>
          <span style={{ color: '#666' }}>Completion rate</span>
          <span className="profile-stat-number">{completionRate}%</span>
        </div>
      </div>

      <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%', marginTop: '20px', padding: '15px' }}>
        Logout
      </button>
    </div>
  );
}