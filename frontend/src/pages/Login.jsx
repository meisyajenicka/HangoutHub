import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../data/localStorage";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      onLogin(found);
      navigate("/dashboard");
    } else {
      setError("Email atau password salah");
    }
    setLoading(false);
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: '20px' }}>
          Don't have account? <Link to="/register" style={{ color: '#8B5CF6' }}>Sign up</Link>
        </p>

        <p style={{ fontSize: '12px', color: '#999', marginTop: '16px' }}>
          Demo: demo@demo.com / 123456
        </p>
      </div>
    </div>
  );
}