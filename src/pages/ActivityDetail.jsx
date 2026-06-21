import { useParams, useNavigate } from "react-router-dom";
import { activities } from "../data/activities";

export default function ActivityDetail({ onAddToPlan }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.find(a => a.id === id);

  if (!activity) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Activity not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/explore')}>
          Back to Explore
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    onAddToPlan(activity);
    alert(`✅ "${activity.title}" added to your plan!`);
    navigate('/my-plan');
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate(-1)} style={{
        background: 'none',
        border: 'none',
        color: '#8B5CF6',
        cursor: 'pointer',
        marginBottom: '20px',
        fontSize: '16px'
      }}>
        ← Back
      </button>

      <img src={activity.image} alt={activity.title} className="detail-image" />

      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>{activity.title}</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <span className="category">{activity.category}</span>
      </div>

      <p className="price" style={{ fontSize: '24px', marginBottom: '20px' }}>{activity.price}</p>

      <div style={{ display: 'flex', gap: '30px', padding: '20px 0', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <div>
          <div style={{ color: '#666', fontSize: '14px' }}>⏱️ Duration</div>
          <div style={{ fontWeight: 'bold' }}>{activity.duration}</div>
        </div>
        <div>
          <div style={{ color: '#666', fontSize: '14px' }}>📍 Location</div>
          <div style={{ fontWeight: 'bold' }}>{activity.location}</div>
        </div>
      </div>

      <p style={{ lineHeight: '1.6', marginBottom: '30px', color: '#444' }}>
        {activity.description}
      </p>

      <button onClick={handleAdd} className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
        + Add to My Plan
      </button>
    </div>
  );
}