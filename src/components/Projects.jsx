import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
<<<<<<< HEAD
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function Projects() {
  const { projects } = usePortfolioData();
=======
import { projects } from "../data/portfolioData";

export default function Projects() {
>>>>>>> 3e28ed9 (fix vercel deployment issue)
  return (
    <section id="projects" className="section-pad relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Applied Learning" title="Academic Projects" />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="gradient-border glow-hover p-8"
            >
              <span className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-highlight text-2xl mb-5">
                <p.icon />
              </span>
              <span className="text-highlight text-xs font-semibold tracking-wide">
                Project 0{i + 1}
              </span>
              <h3 className="font-heading font-semibold text-white text-xl mt-2 mb-3">{p.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
