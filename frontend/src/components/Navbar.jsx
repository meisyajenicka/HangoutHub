import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('hangouthub_darkmode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('hangouthub_darkmode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard" style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none' }}>
        🎯 HangoutHub
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
        <Link to="/explore" style={{ textDecoration: 'none', color: 'inherit' }}>Explore</Link>
        <Link to="/my-plan" style={{ textDecoration: 'none', color: 'inherit' }}>My Plan</Link>
        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>

        <button
          onClick={toggleDarkMode}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            padding: '4px 8px',
            borderRadius: '8px'
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '6px 16px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}