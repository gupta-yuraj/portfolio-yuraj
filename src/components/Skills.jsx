import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
<<<<<<< HEAD
import { usePortfolioData } from "../context/PortfolioDataContext";
=======
import { businessSkills, softwareSkills, typingSpeed } from "../data/portfolioData";
>>>>>>> 3e28ed9 (fix vercel deployment issue)
import { FiCheck } from "react-icons/fi";

function BentoCard({ skill, i, big }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      className={`gradient-border glow-hover p-6 flex flex-col ${big ? "sm:col-span-2" : ""} animate-floatSlow`}
      style={{ animationDelay: `${i * 0.6}s` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center text-highlight text-xl">
          <skill.icon />
        </span>
        <h3 className="font-heading font-semibold text-white">{skill.title}</h3>
      </div>
      <ul className="flex flex-wrap gap-2 mt-auto">
        {skill.items.map((item) => (
          <li
            key={item}
            className="text-xs text-white/65 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
<<<<<<< HEAD
  const { businessSkills, softwareSkills, typingSpeed } = usePortfolioData();
=======
>>>>>>> 3e28ed9 (fix vercel deployment issue)
  return (
    <section id="skills" className="section-pad relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="What I bring" title="Core Business Skills" />

        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {businessSkills.map((skill, i) => (
            <BentoCard key={skill.title} skill={skill} i={i} big={i === 0} />
          ))}
        </div>

        <SectionHeading eyebrow="Tools I use" title="Accounting & Software Skills" />

        <div className="grid sm:grid-cols-3 gap-6">
          {softwareSkills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 glow-hover"
            >
              <h3 className="font-heading font-semibold text-white mb-4">{skill.title}</h3>
              <ul className="space-y-2.5">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <FiCheck className="text-highlight shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 inline-flex items-center gap-3 glass rounded-full px-6 py-3"
        >
          <span className="text-sm text-white/60">Typing Speed</span>
          <span className="font-heading font-bold gradient-text">{typingSpeed}</span>
        </motion.div>
      </div>
    </section>
  );
}
