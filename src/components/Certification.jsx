import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
<<<<<<< HEAD
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function Certification() {
  const { certification } = usePortfolioData();
=======
import { certification } from "../data/portfolioData";

export default function Certification() {
>>>>>>> 3e28ed9 (fix vercel deployment issue)
  return (
    <section id="certification" className="section-pad relative">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading eyebrow="Recognition" title="Certification" />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="shine gradient-border p-10 text-center relative overflow-hidden"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-2xl text-white mb-6 shadow-lg shadow-accent/30">
            <FiAward />
          </div>
          <p className="text-highlight text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            {certification.subtitle}
          </p>
          <h3 className="font-heading font-bold text-2xl text-white">{certification.title}</h3>
        </motion.div>
      </div>
    </section>
  );
}
