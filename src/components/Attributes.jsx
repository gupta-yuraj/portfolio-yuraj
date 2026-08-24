import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
<<<<<<< HEAD
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function Attributes() {
  const { personalAttributes } = usePortfolioData();
=======
import { personalAttributes } from "../data/portfolioData";

export default function Attributes() {
>>>>>>> 3e28ed9 (fix vercel deployment issue)
  return (
    <section id="attributes" className="section-pad relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="How I work" title="Personal Attributes" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personalAttributes.map((attr, i) => (
            <motion.div
              key={attr}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="glass rounded-2xl p-5 flex items-start gap-3 glow-hover animate-floatSlow"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <span className="w-8 h-8 shrink-0 rounded-lg bg-accent/20 flex items-center justify-center text-highlight text-sm">
                <FiZap />
              </span>
              <p className="text-sm text-white/70 leading-snug pt-1">{attr}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
