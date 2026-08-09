import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiSave, FiX, FiEdit2 } from "react-icons/fi";
import { fetchAll, insertRow, updateRow, deleteRow } from "../lib/api";
import { ICON_KEYS } from "../lib/iconMap";

function emptyValues(fields) {
  const v = {};
  fields.forEach((f) => {
    v[f.name] = f.type === "tags" ? [] : f.type === "number" ? 0 : "";
  });
  return v;
}

function FieldInput({ field, value, onChange }) {
  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none resize-none"
      />
    );
  }
  if (field.type === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none"
      />
    );
  }
  if (field.type === "icon") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none"
      >
        {ICON_KEYS.map((k) => (
          <option key={k} value={k} className="bg-secondary">
            {k}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "tags") {
    return (
      <input
        type="text"
        value={Array.isArray(value) ? value.join(", ") : value}
        onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
        placeholder="Item one, Item two, Item three"
        className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none"
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-lg px-3 py-2 text-sm outline-none"
    />
  );
}

export default function SectionEditor({ section }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = not editing, "new" = adding
  const [draft, setDraft] = useState(emptyValues(section.fields));
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAll(section.table);
      setRows(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section.table]);

  const startAdd = () => {
    setDraft(emptyValues(section.fields));
    setEditingId("new");
  };

  const startEdit = (row) => {
    setDraft(section.fields.reduce((acc, f) => ({ ...acc, [f.name]: row[f.name] }), {}));
    setEditingId(row.id);
  };

  const cancel = () => {
    setEditingId(null);
    setDraft(emptyValues(section.fields));
  };

  const save = async () => {
    setSavingId(editingId);
    try {
      if (editingId === "new") {
        const order_index = rows.length ? Math.max(...rows.map((r) => r.order_index || 0)) + 1 : 0;
        await insertRow(section.table, { ...draft, order_index });
      } else {
        await updateRow(section.table, editingId, draft);
      }
      await load();
      cancel();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId(null);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      await deleteRow(section.table, id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading font-semibold text-xl text-white">{section.label}</h2>
        <button
          onClick={startAdd}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-highlight px-4 py-2 text-xs font-semibold"
        >
          <FiPlus /> Add
        </button>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
      {loading && <p className="text-sm text-white/40">Loading…</p>}

      {editingId === "new" && (
        <div className="glass rounded-2xl p-5 mb-4 space-y-3">
          {section.fields.map((f) => (
            <div key={f.name}>
              <label className="text-xs text-white/50 mb-1 block">{f.label}</label>
              <FieldInput field={f} value={draft[f.name]} onChange={(v) => setDraft((d) => ({ ...d, [f.name]: v }))} />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button
              onClick={save}
              disabled={savingId === "new"}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-highlight px-4 py-2 text-xs font-semibold"
            >
              <FiSave /> {savingId === "new" ? "Saving..." : "Save"}
            </button>
            <button onClick={cancel} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs">
              <FiX /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {rows.map((row) =>
          editingId === row.id ? (
            <div key={row.id} className="glass rounded-2xl p-5 space-y-3 border border-highlight/30">
              {section.fields.map((f) => (
                <div key={f.name}>
                  <label className="text-xs text-white/50 mb-1 block">{f.label}</label>
                  <FieldInput field={f} value={draft[f.name]} onChange={(v) => setDraft((d) => ({ ...d, [f.name]: v }))} />
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={save}
                  disabled={savingId === row.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-highlight px-4 py-2 text-xs font-semibold"
                >
                  <FiSave /> {savingId === row.id ? "Saving..." : "Save"}
                </button>
                <button onClick={cancel} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs">
                  <FiX /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={row.id} className="glass rounded-2xl p-4 flex items-start justify-between gap-4">
              <div className="text-sm text-white/75 space-y-1">
                {section.fields.map((f) => (
                  <p key={f.name}>
                    <span className="text-white/40">{f.label}: </span>
                    {Array.isArray(row[f.name]) ? row[f.name].join(", ") : String(row[f.name] ?? "")}
                  </p>
                ))}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(row)} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10">
                  <FiEdit2 className="text-sm" />
                </button>
                <button onClick={() => remove(row.id)} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-red-500/20 text-red-400">
                  <FiTrash2 className="text-sm" />
                </button>
              </div>
            </div>
          )
        )}
        {!loading && rows.length === 0 && <p className="text-sm text-white/35">No entries yet — click Add to create one.</p>}
      </div>
    </div>
  );
}
