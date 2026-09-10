import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function Achievements() {
  const { achievements } = usePortfolioData();
  return (
    <section id="achievements" className="section-pad relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="At a glance" title="Achievements" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-7 text-center glow-hover"
            >
              <p className="font-heading text-3xl font-extrabold gradient-text mb-2">{a.value}</p>
              <p className="text-white/55 text-sm">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
