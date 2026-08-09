import { useEffect, useState } from "react";
import { FiSave, FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import { fetchSingleton, upsertSingleton, uploadResume } from "../lib/api";

const FIELDS = [
  { name: "name", label: "Name" },
  { name: "title_line1", label: "Title line 1" },
  { name: "title_line2", label: "Title line 2" },
  { name: "location", label: "Location" },
  { name: "phone", label: "Phone" },
  { name: "email", label: "Email" },
  { name: "maps_query", label: "Map search query" },
  { name: "typing_speed", label: "Typing speed" },
];

export default function ProfileEditor() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchSingleton("profile");
      setForm(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await upsertSingleton("profile", form);
      setMessage("Saved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadResume(file);
      const updated = { ...form, resume_url: url };
      setForm(updated);
      await upsertSingleton("profile", updated);
      setMessage("Resume uploaded.");
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading || !form) return <p className="text-sm text-white/40">Loading…</p>;

  return (
    <div>
      <h2 className="font-heading font-semibold text-xl text-white mb-5">Profile & Hero</h2>

      <div className="glass rounded-2xl p-6 space-y-4 mb-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {FIELDS.map((f) => (
            <div key={f.name}>
              <label className="text-xs text-white/50 mb-1 block">{f.label}</label>
              <input
                type="text"
                value={form[f.name] || ""}
                onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1 block">Objective (About section glass card)</label>
          <textarea
            rows={3}
            value={form.objective || ""}
            onChange={(e) => setForm((s) => ({ ...s, objective: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none resize-none"
          />
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1 block">Hero subtitle</label>
          <textarea
            rows={2}
            value={form.hero_subtitle || ""}
            onChange={(e) => setForm((s) => ({ ...s, hero_subtitle: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none resize-none"
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
          <FiSave /> {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-heading font-semibold text-white mb-3">Resume (PDF)</h3>
        {form.resume_url && (
          <a href={form.resume_url} target="_blank" rel="noreferrer" className="text-sm text-highlight underline block mb-3 break-all">
            Current resume: {form.resume_url}
          </a>
        )}
        <label className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm cursor-pointer hover:bg-white/10">
          <FiUploadCloud /> {uploading ? "Uploading..." : "Upload new resume PDF"}
          <input type="file" accept="application/pdf" className="hidden" onChange={handleResume} disabled={uploading} />
        </label>
      </div>
    </div>
  );
}
