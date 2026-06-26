export default function MyPlan({ plans, onRemove, onUpdate }) {
  if (plans.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
        <h2>No plans yet</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Start exploring activities!</p>
        <a href="/explore" className="btn btn-primary">Explore Now</a>
      </div>
    );
  }

  const plannedPlans = plans.filter(p => p.status !== "completed");
  const completedPlans = plans.filter(p => p.status === "completed");

  return (
    <div className="container">
      <h1 style={{ marginBottom: '30px' }}>📋 My Plan</h1>

      {/* Upcoming Plans */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#666' }}>
          🕒 Upcoming ({plannedPlans.length})
        </h3>
        {plannedPlans.map(plan => (
          <div key={plan.id} className="card" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px'
          }}>
            <div>
              <h3 style={{ marginBottom: '5px' }}>{plan.activity?.title || plan.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                📅 {plan.planDate}
                {plan.duration && ` • ⏰ ${plan.duration}`}
              </p>
              <p className="price">{plan.activity?.price || plan.price}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => onUpdate(plan.id, "completed")} 
                className="btn btn-success"
                style={{ padding: '8px 16px', fontSize: '12px' }}
              >
                ✓ Done
              </button>
              <button 
                onClick={() => onRemove(plan.id)} 
                className="btn btn-danger"
                style={{ padding: '8px 16px', fontSize: '12px' }}
              >
                ✗ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Plans */}
      {completedPlans.length > 0 && (
        <div>
          <h3 style={{ marginBottom: '15px', color: '#666' }}>
            ✅ Completed ({completedPlans.length})
          </h3>
          {completedPlans.map(plan => (
            <div key={plan.id} className="card" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              opacity: '0.7',
              padding: '16px'
            }}>
              <div>
                <h3 style={{ marginBottom: '5px', textDecoration: 'line-through' }}>
                  {plan.activity?.title || plan.title}
                </h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  📅 {plan.planDate}
                  {plan.duration && ` • ⏰ ${plan.duration}`}
                </p>
              </div>
              <button 
                onClick={() => onRemove(plan.id)} 
                className="btn btn-danger"
                style={{ padding: '8px 16px', fontSize: '12px' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}