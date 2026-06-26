import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();

  console.log("Dark Mode:", darkMode); 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar" style={{ 
      backgroundColor: darkMode ? '#1a1a2e' : 'white',
      borderBottom: darkMode ? '1px solid #334155' : '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    }}>
      <Link to="/dashboard" style={{ 
        fontWeight: 'bold', 
        fontSize: '20px', 
        textDecoration: 'none',
        color: darkMode ? '#e2e8f0' : '#111827'
      }}>
        🎯 HangoutHub
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/dashboard" style={{ 
          textDecoration: 'none', 
          color: darkMode ? '#e2e8f0' : '#333',
          transition: 'color 0.3s ease'
        }}>Dashboard</Link>
        <Link to="/explore" style={{ 
          textDecoration: 'none', 
          color: darkMode ? '#e2e8f0' : '#333',
          transition: 'color 0.3s ease'
        }}>Explore</Link>
        <Link to="/my-plan" style={{ 
          textDecoration: 'none', 
          color: darkMode ? '#e2e8f0' : '#333',
          transition: 'color 0.3s ease'
        }}>My Plan</Link>
        <Link to="/profile" style={{ 
          textDecoration: 'none', 
          color: darkMode ? '#e2e8f0' : '#333',
          transition: 'color 0.3s ease'
        }}>Profile</Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => {
            console.log("Toggle dark mode clicked");
            toggleDarkMode();
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            padding: '4px 8px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            color: darkMode ? '#e2e8f0' : '#333'
          }}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button 
          onClick={handleLogout} 
          className="btn btn-danger" 
          style={{ 
            padding: '6px 16px',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}