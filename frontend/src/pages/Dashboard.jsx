import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getActivities } from "../data/localStorage";

export default function Dashboard({ user, plans }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const activities = getActivities();
    if (Array.isArray(activities) && activities.length > 0) {
      setRecommendations(activities.slice(0, 3));
    }
  }, []);

  const plansArray = Array.isArray(plans) ? plans : [];
  const totalPlans = plansArray.length;
  const completedPlans = plansArray.filter(p => p.status === "completed").length;
  const plannedPlans = plansArray.filter(p => p.status === "planned").length;
  const recentPlans = plansArray.slice(-3).reverse();

  return (
    <div className="container fade-in">
      <div style={{
        background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
        color: 'white',
        padding: '40px',
        borderRadius: '16px',
        marginBottom: '30px'
      }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Hi, {user?.name || 'User'}! 👋</h1>
        <p>Ready for your next adventure?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#8B5CF6' }}>{totalPlans}</div>
          <div style={{ color: '#666' }}>Total Plans</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#F59E0B' }}>{plannedPlans}</div>
          <div style={{ color: '#666' }}>In Progress</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>✅</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10B981' }}>{completedPlans}</div>
          <div style={{ color: '#666' }}>Completed</div>
        </div>
      </div>

      {recentPlans.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>📅 Recent Plans</h2>
            <Link to="/my-plan" style={{ color: '#8B5CF6' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {recentPlans.map(plan => (
              <div key={plan.id} className="card" style={{ padding: '16px' }}>
                <h3 style={{ marginBottom: '5px' }}>{plan.title}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>📅 {plan.planDate}</p>
                <span className="category">{plan.category}</span>
                <span style={{ 
                  marginLeft: '10px',
                  fontSize: '12px',
                  padding: '2px 10px',
                  borderRadius: '20px',
                  background: plan.status === 'completed' ? '#D1FAE5' : '#FEF3C7',
                  color: plan.status === 'completed' ? '#065F46' : '#92400E'
                }}>
                  {plan.status === 'completed' ? '✅ Done' : '⏳ Planned'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>✨ Recommended for You</h2>
          <Link to="/explore" style={{ color: '#8B5CF6' }}>View all →</Link>
        </div>
        {recommendations.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No activities available.</p>
        ) : (
          <div className="grid">
            {recommendations.map(activity => (
              <Link key={activity.id} to={`/activity/${activity.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="activity-card">
                  <img src={activity.image} alt={activity.title} />
                  <div className="activity-card-content">
                    <span className="category">{activity.category}</span>
                    <h3 style={{ margin: '10px 0' }}>{activity.title}</h3>
                    <p className="price">{activity.price}</p>
                    <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>📍 {activity.city}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}