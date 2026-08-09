import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.to)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled ? "glass shadow-lg shadow-black/20 py-2 px-6 mx-4 md:mx-auto" : ""
          }`}
        >
          <button
            onClick={() => goTo("hero")}
            className="font-heading font-bold text-lg tracking-tight cursor-hover"
          >
            Yuraj<span className="text-highlight">.</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.to}
                onClick={() => goTo(link.to)}
                className={`relative text-sm font-medium transition-colors cursor-hover ${
                  active === link.to ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.to && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-highlight rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => goTo("contact")}
            className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-accent to-highlight px-5 py-2 text-sm font-semibold text-white glow-hover cursor-hover"
          >
            Let's Talk
          </button>

          <button
            className="md:hidden text-2xl text-white cursor-hover"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[70px] left-4 right-4 z-40 glass rounded-2xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => goTo(link.to)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium ${
                    active === link.to ? "bg-white/10 text-white" : "text-white/70"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
