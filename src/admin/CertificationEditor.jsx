import { useEffect, useState } from "react";
import { FiSave, FiCheckCircle } from "react-icons/fi";
import { fetchSingleton, upsertSingleton } from "../lib/api";

export default function CertificationEditor() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSingleton("certification")
      .then(setForm)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await upsertSingleton("certification", form);
      setMessage("Saved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <p className="text-sm text-white/40">Loading…</p>;

  return (
    <div>
      <h2 className="font-heading font-semibold text-xl text-white mb-5">Certification</h2>
      <div className="glass rounded-2xl p-6 space-y-4 max-w-lg">
        <div>
          <label className="text-xs text-white/50 mb-1 block">Title</label>
          <input
            type="text"
            value={form.title || ""}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-white/50 mb-1 block">Subtitle</label>
          <input
            type="text"
            value={form.subtitle || ""}
            onChange={(e) => setForm((s) => ({ ...s, subtitle: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {message && (
          <p className="text-sm text-emerald-400 flex items-center gap-1.5">
            <FiCheckCircle /> {message}
          </p>
        )}

        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-highlight px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
        >
          <FiSave /> {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
