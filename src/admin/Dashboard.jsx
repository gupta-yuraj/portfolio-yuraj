import { useState } from "react";
import { FiUser, FiAward, FiMail, FiLogOut, FiExternalLink, FiMenu, FiX } from "react-icons/fi";
import { useAdminAuth } from "./AuthContext";
import ProfileEditor from "./ProfileEditor";
import CertificationEditor from "./CertificationEditor";
import SectionEditor from "./SectionEditor";
import Messages from "./Messages";
import { SECTIONS } from "../lib/sections";

const NAV = [
  { key: "profile", label: "Profile & Hero", icon: FiUser },
  ...SECTIONS.map((s) => ({ key: s.key, label: s.label, icon: null, section: s })),
  { key: "certification", label: "Certification", icon: FiAward },
  { key: "messages", label: "Messages", icon: FiMail },
];

export default function Dashboard() {
  const { signOut } = useAdminAuth();
  const [active, setActive] = useState("profile");
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeItem = NAV.find((n) => n.key === active);

  const renderActive = () => {
    if (active === "profile") return <ProfileEditor />;
    if (active === "certification") return <CertificationEditor />;
    if (active === "messages") return <Messages />;
    if (activeItem?.section) return <SectionEditor section={activeItem.section} />;
    return null;
  };

  const NavLinks = () => (
    <nav className="space-y-1">
      {NAV.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            setActive(item.key);
            setMobileOpen(false);
          }}
          className={`w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
            active === item.key ? "bg-white/10 text-white font-medium" : "text-white/55 hover:text-white hover:bg-white/5"
          }`}
        >
          {item.icon ? <item.icon className="shrink-0" /> : <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 ml-0.5" />}
          <span className="truncate">{item.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-primary text-white flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/10 p-5">
        <p className="font-heading font-bold text-lg mb-6 px-1">
          Yuraj<span className="text-highlight">.</span> Admin
        </p>
        <div className="flex-1 overflow-y-auto pr-1">
          <NavLinks />
        </div>
        <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm text-white/55 hover:text-white hover:bg-white/5"
          >
            <FiExternalLink /> View live site
          </a>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm text-white/55 hover:text-red-400 hover:bg-red-500/10"
          >
            <FiLogOut /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 glass">
        <p className="font-heading font-bold">
          Yuraj<span className="text-highlight">.</span> Admin
        </p>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-xl">
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-30 bg-primary p-5 overflow-y-auto">
          <NavLinks />
          <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
            <a href="/" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm text-white/55">
              <FiExternalLink /> View live site
            </a>
            <button onClick={signOut} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm text-red-400">
              <FiLogOut /> Sign out
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 p-6 lg:p-10 pt-20 lg:pt-10 max-w-4xl">{renderActive()}</main>
    </div>
  );
}
