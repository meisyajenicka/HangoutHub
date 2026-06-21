import { useState } from "react";
import { Link } from "react-router-dom";
import { activities } from "../data/activities";

export default function Explore() {
  const [search, setSearch] = useState("");

  const filtered = activities.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 style={{ marginBottom: '20px' }}>Explore Activities</h1>

      <input
        type="text"
        placeholder="🔍 Search activities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '30px' }}
      />

      <div className="grid">
        {filtered.map(activity => (
          <Link key={activity.id} to={`/activity/${activity.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="activity-card">
              <img src={activity.image} alt={activity.title} />
              <div className="activity-card-content">
                <span className="category">{activity.category}</span>
                <h3 style={{ margin: '10px 0' }}>{activity.title}</h3>
                <p className="price">{activity.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
          No activities found
        </p>
      )}
    </div>
  );
}