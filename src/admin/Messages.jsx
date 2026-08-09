import { useEffect, useState } from "react";
import { FiMail, FiTrash2, FiUser } from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { fetchMessages, updateRow, deleteRow } from "../lib/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchMessages();
      setMessages(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleOpen = async (msg) => {
    const willOpen = openId !== msg.id;
    setOpenId(willOpen ? msg.id : null);
    if (willOpen && !msg.is_read) {
      try {
        await updateRow("messages", msg.id, { is_read: true });
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m)));
      } catch {
        // non-fatal — leave as unread in the UI if the update fails
      }
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteRow("messages", id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading font-semibold text-xl text-white flex items-center gap-2">
          Messages
          {unreadCount > 0 && (
            <span className="text-xs font-semibold bg-accent/30 text-highlight rounded-full px-2.5 py-0.5">
              {unreadCount} new
            </span>
          )}
        </h2>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
      {loading && <p className="text-sm text-white/40">Loading…</p>}

      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="glass rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleOpen(msg)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
            >
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  msg.is_read ? "bg-white/10 text-white/40" : "bg-accent/25 text-highlight"
                }`}
              >
                {msg.is_read ? <HiOutlineMailOpen /> : <FiMail />}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm truncate ${msg.is_read ? "text-white/60" : "text-white font-semibold"}`}>
                    {msg.subject}
                  </p>
                </div>
                <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                  <FiUser className="shrink-0" /> {msg.name} · {msg.email}
                </p>
              </div>
              <span className="text-[11px] text-white/35 shrink-0">
                {new Date(msg.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(msg.id);
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/20 text-white/40 hover:text-red-400 shrink-0"
              >
                <FiTrash2 className="text-sm" />
              </button>
            </button>
            {openId === msg.id && (
              <div className="px-4 pb-4 pt-1 border-t border-white/5">
                <p className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                <a
                  href={`mailto:${msg.email}?subject=${encodeURIComponent("Re: " + msg.subject)}`}
                  className="inline-block mt-3 text-xs text-highlight hover:underline"
                >
                  Reply via email →
                </a>
              </div>
            )}
          </div>
        ))}
        {!loading && messages.length === 0 && (
          <p className="text-sm text-white/35">No messages yet — they'll show up here as visitors submit the contact form.</p>
        )}
      </div>
    </div>
  );
}
