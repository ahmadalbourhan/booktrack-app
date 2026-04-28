import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

      if (authError) {
        if (authError.status === 429) {
          setError(
            "Too many login attempts. Please wait a few minutes and try again.",
          );
        } else {
          setError(authError.message || "Invalid email or password");
        }
        setLoading(false);
        return;
      }

      const user = authData.user;

      // 2. Fetch the user's profile (extra fields)
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("name, specific_id, unique_number")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        setError("Successfully logged in, but profile data is missing.");
      } else {
        setProfile(profileData);
      }
      setLoading(false);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
      setLoading(false);
    }

    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your BookTrack account</p>
          </div>

          {!profile ? (
            <form onSubmit={handleLogin} className="auth-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="auth-footer">
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={() => navigate("/register")}>
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <h3>Welcome, {profile.name}! 🎉</h3>
              <p>Successfully logged in</p>
              <div className="profile-info">
                <p>
                  <strong>ID:</strong> {profile.specific_id}
                </p>
                <p>
                  <strong>Number:</strong> {profile.unique_number}
                </p>
              </div>
              <button className="btn-primary" onClick={() => navigate("/")}>
                Go to Home
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
