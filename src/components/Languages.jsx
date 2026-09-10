import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { usePortfolioData } from "../context/PortfolioDataContext";

function CircleCard({ lang, i }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (lang.percent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.12 }}
      className="glass rounded-2xl p-6 flex flex-col items-center glow-hover"
    >
      <svg width="110" height="110" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#langGradient)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 + i * 0.12, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="langGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
      </svg>
      <h3 className="font-heading font-semibold text-white mt-4">{lang.name}</h3>
      <p className="text-white/50 text-xs mt-1">{lang.level}</p>
    </motion.div>
  );
}

export default function Languages() {
  const { languages } = usePortfolioData();
  return (
    <section id="languages" className="section-pad relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading eyebrow="Communication" title="Languages" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
          {languages.map((lang, i) => (
            <CircleCard key={lang.name} lang={lang} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
