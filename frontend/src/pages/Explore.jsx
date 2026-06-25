import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { activitiesAPI } from "../api/client";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Explore() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [cities, setCities] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [nearbyMode, setNearbyMode] = useState(false);
  const [nearbyCity, setNearbyCity] = useState(null);

  const categories = [
  "all", 
  "Wisata Alam", 
  "Wisata Budaya", 
  "Kuliner", 
  "Olahraga"];

  useEffect(() => {
    fetchActivities();
    fetchCities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await activitiesAPI.getAll();
      setActivities(response.data);
      setFilteredActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await activitiesAPI.getCities();
      setCities(["all", ...response.data]);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getLocation = () => {
    setLocationLoading(true);
    setNearbyMode(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          try {
            const response = await activitiesAPI.getNearby(latitude, longitude);
            setNearbyCity(response.data.nearestCity);
            setFilteredActivities(response.data.activities);
            
            // Reset filters
            setSelectedCategory("all");
            setSelectedCity("all");
            setSearch("");
          } catch (error) {
            console.error("Error fetching nearby:", error);
            alert("Gagal mengambil kegiatan terdekat");
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Mohon izinkan akses lokasi untuk fitur Near Me");
          setLocationLoading(false);
          setNearbyMode(false);
        }
      );
    } else {
      alert("Browser tidak mendukung geolocation");
      setLocationLoading(false);
      setNearbyMode(false);
    }
  };

  // Reset ke semua kegiatan
  const resetToAll = () => {
    setNearbyMode(false);
    setUserLocation(null);
    setNearbyCity(null);
    setSelectedCategory("all");
    setSelectedCity("all");
    setSearch("");
    setFilteredActivities(activities);
  };

  // Filter logic
  useEffect(() => {
    if (nearbyMode) return; // Skip filter if in nearby mode
    
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
  }, [activities, selectedCategory, selectedCity, search, nearbyMode]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Explore Activities</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={getLocation}
            disabled={locationLoading}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: nearbyMode ? '#10B981' : '#8B5CF6',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              opacity: locationLoading ? 0.7 : 1
            }}
          >
            {locationLoading ? '⏳ Getting...' : nearbyMode ? '📍 Near You' : '📍 Near Me'}
          </button>
          
          {nearbyMode && (
            <button
              onClick={resetToAll}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: '1px solid #ddd',
                background: 'white',
                color: '#333',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✕ Reset
            </button>
          )}
        </div>
      </div>

      {/* Nearby Mode Info */}
      {nearbyMode && nearbyCity && (
        <div style={{
          background: '#D1FAE5',
          padding: '12px 16px',
          borderRadius: '12px',
          marginBottom: '20px',
          color: '#065F46',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>
            📍 Menampilkan kegiatan di <strong>{nearbyCity}</strong> 
            {userLocation && ` (berdasarkan lokasi Anda)`}
          </span>
          <span style={{ fontSize: '14px' }}>
            {filteredActivities.length} kegiatan ditemukan
          </span>
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search activities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px' }}
        disabled={nearbyMode}
      />

      {/* Filter by Category */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
          Category
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              disabled={nearbyMode}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                background: selectedCategory === cat ? '#8B5CF6' : '#e5e7eb',
                color: selectedCategory === cat ? 'white' : '#333',
                cursor: nearbyMode ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                opacity: nearbyMode ? 0.5 : 1
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter by City */}
      {cities.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            📍 City
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                disabled={nearbyMode}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: selectedCity === city ? '#8B5CF6' : '#e5e7eb',
                  color: selectedCity === city ? 'white' : '#333',
                  cursor: nearbyMode ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  opacity: nearbyMode ? 0.5 : 1
                }}
              >
                {city === 'all' ? 'All Cities' : city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {filteredActivities.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
          {nearbyMode ? (
            <>
              <p style={{ fontSize: '20px', marginBottom: '10px' }}>📍 Tidak ada kegiatan di dekat lokasi Anda</p>
              <p>Coba perbesar radius atau pilih kota lain</p>
              <button
                onClick={resetToAll}
                style={{
                  marginTop: '20px',
                  padding: '10px 30px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#8B5CF6',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Lihat Semua Kegiatan
              </button>
            </>
          ) : (
            'No activities found'
          )}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <p style={{ fontSize: '12px', color: '#999' }}>📍 {activity.city}</p>
                    {activity.distance && (
                      <span style={{ 
                        fontSize: '11px', 
                        background: '#E0F2FE', 
                        color: '#0369A1',
                        padding: '2px 10px',
                        borderRadius: '12px'
                      }}>
                        📏 {activity.distance}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}