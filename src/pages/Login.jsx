import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "demo@demo.com" && password === "123") {
      onLogin({ id: "1", name: "Demo User", email });
      navigate("/dashboard");
    } else {
      setError("Email: demo@demo.com, Password: 123");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>🎯</h1>
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue</p>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: '20px' }}>
          Don't have account? <Link to="/register" style={{ color: '#8B5CF6' }}>Sign up</Link>
        </p>
        <p style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>
          Demo: demo@demo.com / 123
        </p>
      </div>
    </div>
  );
}