import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../data/localStorage";

export default function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak sama");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      setError("Email sudah terdaftar");
      setLoading(false);
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8B5CF6&color=fff`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    onLogin(newUser);
    navigate("/dashboard");
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>🎉</h1>
        <h2>Create Account</h2>
        <p className="subtitle">Join us today</p>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: '20px' }}>
          Already have account? <Link to="/login" style={{ color: '#8B5CF6' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}