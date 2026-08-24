import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
<<<<<<< HEAD
import { usePortfolioData } from "../context/PortfolioDataContext";

export default function Education() {
  const { education } = usePortfolioData();
=======
import { education } from "../data/portfolioData";

export default function Education() {
>>>>>>> 3e28ed9 (fix vercel deployment issue)
  return (
    <section id="education" className="section-pad relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading eyebrow="Academic Path" title="Education" />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-highlight/50 to-transparent" />

          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-8 sm:-left-10 top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-accent to-highlight shadow-lg shadow-accent/40" />
              <div className="gradient-border glow-hover p-6">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-accent/20 flex items-center justify-center text-highlight text-lg">
                    <FiBookOpen />
                  </span>
                  <div>
                    <p className="text-highlight text-xs font-semibold tracking-wide mb-1">{edu.period}</p>
                    <h3 className="font-heading font-semibold text-white text-lg mb-1">{edu.degree}</h3>
                    <p className="text-white/55 text-sm">
                      {edu.school} · {edu.place}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
