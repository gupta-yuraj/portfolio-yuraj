import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import useCountUp from "../hooks/useCountUp";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { FiTarget } from "react-icons/fi";

function Counter({ value, suffix, label, delay }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <p className="font-heading text-3xl sm:text-4xl font-extrabold gradient-text">
        {current}
        {suffix}
      </p>
      <p className="text-white/50 text-xs sm:text-sm mt-1">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const { aboutCounters, objective } = usePortfolioData();
  return (
    <section id="about" className="section-pad relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Get to know me" title="About Me" />

        <div className="grid md:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-3 space-y-5 text-white/65 leading-relaxed"
          >
            <p>
              I am a motivated Business Administration graduate passionate about business strategy, operations
              management, customer satisfaction, and business development.
            </p>
            <p>
              I enjoy solving business problems using analytical thinking, operational improvements, and strategic
              planning.
            </p>
            <p>
              I believe in continuous learning, teamwork, adaptability, and creating measurable business value.
            </p>
            <p>I am open to rotational shifts, field operations, and fast-paced business environments.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 gradient-border glow-hover p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-highlight text-lg">
                <FiTarget />
              </span>
              <h3 className="font-heading font-semibold text-white">Objective</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{objective}</p>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-3 sm:grid-cols-5 gap-6 glass rounded-3xl p-8">
          {aboutCounters.map((c, i) => (
            <Counter key={c.label} value={c.value} suffix={c.suffix} label={c.label} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
