import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/client";

export default function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

    try {
      const response = await authAPI.register({ name, email, password });
      onLogin(response.data.user, response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
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
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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