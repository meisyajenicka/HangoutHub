import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getActivities } from "../data/localStorage";

export default function Explore() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [cities, setCities] = useState([]);

  const categories = ["all", "Wisata Alam", "Wisata Budaya", "Kuliner", "Olahraga"];

  useEffect(() => {
    const data = getActivities();
    setActivities(data);
    setFilteredActivities(data);
    const cityList = [...new Set(data.map(a => a.city))];
    setCities(["all", ...cityList]);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...activities];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }
    if (selectedCity !== "all") {
      filtered = filtered.filter(a => a.city === selectedCity);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchLower) ||
        a.description.toLowerCase().includes(searchLower) ||
        a.location.toLowerCase().includes(searchLower)
      );
    }

    setFilteredActivities(filtered);
  }, [activities, selectedCategory, selectedCity, search]);

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="container fade-in">
      <h1 style={{ marginBottom: '20px' }}>Explore Activities</h1>

      <input
        type="text"
        placeholder="🔍 Search activities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid #ddd' }}
      />

      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Category</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                background: selectedCategory === cat ? '#8B5CF6' : '#e5e7eb',
                color: selectedCategory === cat ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {cities.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>📍 City</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: selectedCity === city ? '#8B5CF6' : '#e5e7eb',
                  color: selectedCity === city ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {city === 'all' ? 'All Cities' : city}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredActivities.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
          <p>No activities found</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>Total activities: {activities.length}</p>
        </div>
      ) : (
        <div className="grid">
          {filteredActivities.map(activity => (
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
  );
}