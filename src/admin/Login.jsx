import { useState } from "react";
import { FiLock, FiAlertCircle } from "react-icons/fi";
import { useAdminAuth } from "./AuthContext";
import { isSupabaseConfigured } from "../lib/supabaseClient";

export default function Login() {
  const { signIn } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(password);
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6 text-white">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-heading font-bold text-2xl mb-1">
            Yuraj<span className="text-highlight">.</span> Admin
          </p>
          <p className="text-white/45 text-sm">Enter the admin password to manage the site</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="glass rounded-xl p-4 mb-5 text-xs text-amber-300 flex gap-2">
            <FiAlertCircle className="shrink-0 mt-0.5" />
            <span>
              Supabase isn't configured yet. Add <code>VITE_SUPABASE_URL</code>,{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> and <code>VITE_ADMIN_EMAIL</code> to a{" "}
              <code>.env</code> file (see README), run <code>supabase/schema.sql</code>, then create
              your admin user in the Supabase dashboard under Authentication → Users using that same
              email.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Password</label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 focus-within:border-highlight rounded-xl px-3">
              <FiLock className="text-white/40" />
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/30"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-gradient-to-r from-accent to-highlight py-3 text-sm font-semibold disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <a href="/" className="block text-center text-xs text-white/40 mt-6 hover:text-white/70">
          ← Back to site
        </a>
      </div>
    </div>
  );
}
