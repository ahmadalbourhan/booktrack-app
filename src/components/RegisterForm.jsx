import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    specificId: "",
    uniqueNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading) return;

    setError(null);

    // Validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!form.email || !form.password || !form.name) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // 1. Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        if (authError.message.includes("429") || authError.status === 429) {
          throw new Error(
            "Too many signup attempts. Please wait a few minutes and try again.",
          );
        }
        throw authError;
      }

      const userId = authData.user?.id;
      if (!userId) {
        throw new Error("Registration failed. Please try again.");
      }

      // 2. Insert extra fields into profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        name: form.name,
        specific_id: form.specificId || "",
        unique_number: form.uniqueNumber || "",
      });

      if (profileError) {
        console.error("Profile error details:", profileError);
        throw new Error(
          profileError.message || "Failed to create user profile.",
        );
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage =
        err?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Join BookTrack</h1>
          <p>Create your account to start tracking</p>
        </div>

        {success ? (
          <div className="success-message">
            <p>✓ Account created successfully!</p>
            <p>Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="specificId">Specific ID</label>
                <input
                  id="specificId"
                  type="text"
                  placeholder="ID"
                  value={form.specificId}
                  onChange={(e) =>
                    setForm({ ...form, specificId: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="uniqueNumber">Unique Number</label>
                <input
                  id="uniqueNumber"
                  type="text"
                  placeholder="Number"
                  value={form.uniqueNumber}
                  onChange={(e) =>
                    setForm({ ...form, uniqueNumber: e.target.value })
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="auth-footer">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={() => navigate("/login")}>
                  Sign in
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
