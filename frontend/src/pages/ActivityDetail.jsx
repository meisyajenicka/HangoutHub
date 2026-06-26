import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActivities } from "../data/localStorage";

const durationOptions = [
  "30 menit", "1 jam", "1.5 jam", "2 jam", "2.5 jam", "3 jam", "3.5 jam", 
  "4 jam", "5 jam", "6 jam", "8 jam", "1 hari", "2 hari", "3 hari"
];

export default function ActivityDetail({ onAddToPlan }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDuration, setSelectedDuration] = useState("2 jam");

  useEffect(() => {
    const activities = getActivities();
    const found = activities.find(a => a.id === id);
    if (found) {
      setActivity(found);
      setSelectedDuration(found.duration || "2 jam");
    }
    setLoading(false);
  }, [id]);

  const handleAdd = () => {
    onAddToPlan(activity, selectedDuration);
    alert(`✅ "${activity.title}" added to your plan! (${selectedDuration})`);
    navigate('/my-plan');
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (!activity) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Activity not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/explore')}>Back to Explore</button>
      </div>
    );
  }

  return (
    <div className="container fade-in" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate(-1)} style={{
        background: 'none',
        border: 'none',
        color: '#8B5CF6',
        cursor: 'pointer',
        marginBottom: '20px',
        fontSize: '16px'
      }}>← Back</button>

      <img src={activity.image} alt={activity.title} className="detail-image" />

      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>{activity.title}</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <span className="category">{activity.category}</span>
        <span className="category" style={{ background: '#E0F2FE', color: '#0369A1' }}>📍 {activity.city}</span>
      </div>

      <p className="price" style={{ fontSize: '24px', marginBottom: '20px' }}>{activity.price}</p>

      <div style={{ display: 'flex', gap: '30px', padding: '20px 0', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <div>
          <div style={{ color: '#666', fontSize: '14px' }}>⏱️ Default Durasi</div>
          <div style={{ fontWeight: 'bold' }}>{activity.duration}</div>
        </div>
        <div>
          <div style={{ color: '#666', fontSize: '14px' }}>📍 Location</div>
          <div style={{ fontWeight: 'bold' }}>{activity.location}</div>
        </div>
      </div>

      <p style={{ lineHeight: '1.6', marginBottom: '30px', color: '#444' }}>{activity.description}</p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>📅 Pilih Tanggal</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ width: 'auto', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>⏰ Atur Durasi</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {durationOptions.map(dur => (
            <button
              key={dur}
              onClick={() => setSelectedDuration(dur)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid',
                borderColor: selectedDuration === dur ? '#8B5CF6' : '#e5e7eb',
                background: selectedDuration === dur ? '#F3E8FF' : 'white',
                color: selectedDuration === dur ? '#8B5CF6' : '#333',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: selectedDuration === dur ? 'bold' : 'normal'
              }}
            >
              {dur}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleAdd} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '16px' }}>
        + Add to My Plan ({selectedDuration})
      </button>
    </div>
  );
}